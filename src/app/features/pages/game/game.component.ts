import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as p2 from 'p2';
import { Subscription } from 'rxjs';
import { GameConfig } from 'src/app/core/configs/game.config';
import { gameInterface } from 'src/app/core/interfaces/game.interface';
import { playerInterface } from 'src/app/core/interfaces/player.interface';
import { StorageUtils } from 'src/app/core/utils/storage.utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canva', { read: ElementRef })
  canvas?: ElementRef<HTMLCanvasElement>;
  public player?: playerInterface;
  public enemy?: playerInterface;
  public maxPower: number;
  public turn: number;
  public counter: number;
  public windAngle: number;
  public windSpeed: number;
  public power: number;
  public lastShot: number;
  public myTurn: boolean;
  public gameData?: gameInterface;
  private gameId: string;
  private playerId: string;
  private world: p2.World;
  private player1: p2.Body;
  private player2: p2.Body;
  private bullet: p2.Body;
  private bulletShape: p2.Shape;
  private scale: number;
  private camera: { x: number; y: number };
  private frameRate = 1000 / 60;
  private listenGameSubscription?: Subscription;

  @HostListener('document:keydown', ['$event'])
  handleKeyPressEvent(e: KeyboardEvent) {
    this.keydown(e);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(e: KeyboardEvent) {
    this.keyUp(e);
  }

  constructor(
    private config: GameConfig,
    private server: GameService,
    private router: Router,
    private storage: StorageUtils
  ) {
    this.maxPower = this.config.MaxPower;
    this.turn = 0;
    this.windAngle = 0;
    this.windSpeed = 0;
    this.power = 0;
    this.lastShot = 0;
    this.counter = this.config.CountDown;
    this.myTurn = false;
    this.gameId = this.storage.getStorage('gameStarted')?.id;
    this.playerId = this.storage.getStorage('user')?.playerId;
    this.scale = 1;
    this.camera = { x: 0, y: 0 };

    this.world = new p2.World({
      gravity: [0, -9.82],
      broadphase: new p2.SAPBroadphase(1),
    });
    this.player1 = new p2.Body({
      mass: 80,
      position: [90, 0],
      id: 1,
      type: p2.Body.KINEMATIC,
    });
    this.player2 = new p2.Body({
      mass: 80,
      position: [670, 0],
      id: 2,
      type: p2.Body.KINEMATIC,
    });
    this.bullet = new p2.Body({
      mass: 1,
      position: [0, 0],
      id: 0,
    });
    this.bulletShape = new p2.Circle({ radius: 8 });
    this.bullet.addShape(this.bulletShape);
  }

  ngAfterViewInit(): void {
    if (this.gameId) {
      this.server.getGame(this.gameId).subscribe(({ game, players }) => {
        if (game && players) {
          this.gameData = game;
          this.player = players.find((player) => player._id === this.playerId);
          this.enemy = players.find((player) => player._id !== this.playerId);
          if (this.player && this.enemy) {
            this.player1.position[0] = this.player?.position.x;
            this.player2.position[0] = this.enemy?.position.x;
          }
          this.setWind(game.wind.angle, game.wind.speed);
          this.myTurn = this.playerId === game.playerTurn;
          this.startGame();
        }
      });
      this.updateGame();
    } else {
      this.router.navigate(['/dash']);
    }
  }

  ngOnDestroy(): void {
    this.storage.removeStorage('gameStarted');
    this.exit();
  }

  private detectCollision() {
    this.world.on('beginContact', (event: p2.BeginContactEvent) => {
      console.log(event.bodyA.id, event.bodyB.id);
      this.bullet.velocity[0] = 0;
      this.bullet.velocity[1] = 0;
      this.bullet.removeShape(this.bulletShape);
      this.hit(event.bodyA, event.bodyB);
    });
  }

  private hit(body: p2.Body, bullet: p2.Body): void {
    if (body.id === 1 && bullet.id === 0 && this.gameData && this.player) {
      this.server.hitBullet(this.gameData?._id, this.player?._id, 10);
      alert(this.player?.name + ' foi acertado!');
    } else if (
      body.id === 2 &&
      bullet.id === 0 &&
      this.gameData &&
      this.enemy
    ) {
      this.server.hitBullet(this.gameData?._id, this.enemy?._id, 10);
      alert(this.enemy?.name + ' foi acertado!');
    }
  }

  private updateGame(): void {
    this.listenGameSubscription = this.server
      .listenGame(this.gameId)
      .subscribe(({ game, players }) => {
        const enemy = players?.find((player) => player._id === this.enemy?._id);
        const myPlayer = players?.find(
          (player) => player._id === this.player?._id
        );
        if (game) {
          this.gameData = game;
          this.setWind(game.wind.angle, game.wind.speed);
          this.myTurn = this.playerId === game.playerTurn;
          this.counter = game.countdown;
          if (this.gameData.winner) {
            confirm(
              'Fim de jogo, o vencedor é "' + this.gameData.winner.name + '"'
            );
            this.listenGameSubscription?.unsubscribe();
            this.router.navigate(['/dash']);
          }
        }
        if (this.player && myPlayer) {
          this.player.hp = myPlayer.hp;
        }
        if (enemy && this.enemy) {
          this.player2.position[0] = enemy.position.x;
          this.player2.position[1] = enemy.position.y;
          this.player2.shapes[1].angle = (Math.PI * enemy.angle) / 180;
          this.enemy = enemy;
        }
      });
    this.server.listenShoot(this.gameId).subscribe((data) => {
      if (data.playerId === this.player?._id) {
        this.shoot(data.angle, data.power, this.player1);
      } else if (data.playerId === this.enemy?._id) {
        this.shoot(data.angle, data.power, this.player2);
      }
    });
  }

  public exit() {
    if (this.player && this.gameData && this.gameData.status === 'playning') {
      this.server.leaveGame(this.player?._id, this.gameData?._id);
    }
    this.listenGameSubscription?.unsubscribe();
    this.router.navigate(['/dash']);
  }

  private setWind(angle: number, speed: number): void {
    this.windAngle = angle;
    this.windSpeed = speed;
    this.world.gravity[0] = (speed / 2) * (angle > 180 ? -1 : 1);
  }

  public keydown(e: KeyboardEvent): void {
    if (this.player && this.gameData) {
      if (e.code === 'Space' && this.myTurn) {
        if (this.power < this.maxPower && this.power >= 0) {
          this.power += 1;
        }
        return;
      } else if (e.code === 'ArrowLeft' && this.myTurn && this.counter > 0) {
        this.player1.position[0] -= 1;
      } else if (e.code === 'ArrowRight' && this.myTurn && this.counter > 0) {
        this.player1.position[0] += 1;
      } else if (e.code === 'ArrowUp') {
        this.player.angle += 1;
        this.player1.shapes[1].angle = (Math.PI * this.player.angle) / 180;
      } else if (e.code === 'ArrowDown') {
        this.player.angle -= 1;
        this.player1.shapes[1].angle = (Math.PI * this.player.angle) / 180;
      } else {
        return;
      }
      this.server.movePlayer(this.player, this.gameData?._id);
    }
  }

  public keyUp(e: KeyboardEvent): void {
    if (e.code === 'Space' && this.myTurn) {
      this.lastShot = this.power;
      if (this.player && this.gameData) {
        this.server.shoot({
          playerId: this.player?._id,
          power: this.power,
          gameId: this.gameData?._id,
          angle: this.player.angle,
        });
      }
    }
  }

  private shoot(angle: number, power: number, player: p2.Body): void {
    const calcAngle = (Math.PI * angle) / 180;
    const forceX = Math.cos(calcAngle) * power;
    const forceY = Math.sin(calcAngle) * power;
    console.log(angle, power, player.position[0], player.position[1]);
    this.bullet.addShape(this.bulletShape);
    this.bullet.position[0] = player.position[0] + 20;
    this.bullet.position[1] = player.position[1] + 40;
    this.bullet.velocity[0] = forceX;
    this.bullet.velocity[1] = forceY > 0 ? forceY : 1;
    this.power = 0;
  }

  private addShapes(player1: playerInterface, player2: playerInterface) {
    const player1Shape = new p2.Box({ width: 40, height: 20 });
    const player1GunShape = new p2.Box({ width: 20, height: 5 });
    this.player1.addShape(player1Shape);
    this.player1.addShape(player1GunShape, [5, 17], player1.angle);
    this.player1.position[0] = player1.position.x;
    this.player1.position[1] = player1.position.y;
    this.player1.id = 1;

    const player2Shape = new p2.Box({ width: 40, height: 20 });
    const player2GunShape = new p2.Box({ width: 20, height: 5 });
    this.player2.addShape(player2Shape);
    this.player2.addShape(player2GunShape, [-2, 20], player2.angle);
    this.player2.position[0] = player2.position.x;
    this.player2.position[1] = player2.position.y;
    this.player2.id = 2;

    const groundBody = new p2.Body({ mass: 0, type: p2.Body.STATIC });
    const groundShape = new p2.Plane();
    groundBody.addShape(groundShape);
    groundBody.id = 10;
    this.bullet.id = 0;

    this.world.addBody(groundBody);
    this.world.addBody(this.player1);
    this.world.addBody(this.player2);
    this.world.addBody(this.bullet);
  }

  private startGame() {
    const canvas = this.canvas?.nativeElement;
    if (this.player && this.enemy) {
      this.addShapes(this.player, this.enemy);
      this.detectCollision();
    }
    if (canvas) {
      const w = canvas.width;
      const h = canvas.height;
      const ctx = canvas.getContext('2d');

      if (ctx) ctx.lineWidth = 0.05;

      setInterval(() => {
        this.world.step((10 * 1) / 60, undefined, 3);
        if (ctx) this.render(ctx, w, h);
      }, this.frameRate);
    }
  }

  private render(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const scaleX = this.scale;
    const scaleY = -this.scale;

    // Clear the canvas
    ctx.clearRect(0, 0, w, h);

    // Transform the canvas
    ctx.save();
    ctx.translate(this.camera.x + 0, this.camera.y + h);
    ctx.scale(scaleX, scaleY);

    // Draw all bodies
    for (var i = 0; i < this.world.bodies.length; i++) {
      var body = this.world.bodies[i];
      for (var j = 0; j < body.shapes.length; j++) {
        var shape = body.shapes[j];
        const isGun = j > 0;
        var color = isGun ? '#ff0000' : '#000000';

        if (shape instanceof p2.Box)
          this.drawBox(ctx, body, shape, color, isGun);
        else if (shape instanceof p2.Circle) this.drawCircle(ctx, body, shape);
        else if (shape instanceof p2.Plane) this.drawPlane(ctx, body, shape);
      }
    }

    ctx.beginPath();
    ctx.stroke();
    ctx.restore();
  }

  private drawCircle(ctx: CanvasRenderingContext2D, body: p2.Body, shape: any) {
    var x = body.position[0],
      y = body.position[1];

    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(body.angle);
    ctx.arc(0, 0, shape.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.restore();
  }

  private drawPlane(ctx: CanvasRenderingContext2D, body: p2.Body, shape: any) {
    const x = body.position[0];
    const y = body.position[1];
    const length = 800;

    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(body.angle);
    ctx.moveTo(-length, 0);
    ctx.lineTo(length, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -0.5);
    ctx.stroke();
    ctx.restore();
  }

  private drawBox(
    ctx: CanvasRenderingContext2D,
    body: p2.Body,
    shape: any,
    color = '#f00',
    isGun = false
  ) {
    const x = isGun ? shape.position[0] + body.position[0] : body.position[0];
    const y = isGun ? shape.position[1] + body.position[1] : body.position[1];
    const tankVertsLeft = [
      12, 21, 15, 19, 15, 15, 11, 15, 11, 14, 18, 10, 18, 2, 14, -1, -16, -1,
      -18, 2, -18, 4, -16, 10, -10, 12, 0, 13, 0, 15, -2, 15, -2, 21,
    ];
    const tankVertsRight = [
      -13, 22, -15, 20, -15, 15, -12, 15, -13, 14, -18, 10, -18, 2, -14, -1, 15,
      -1, 17, 1, 17, 5, 16, 10, 6, 13, -1, 13, -1, 15, 1, 15, 1, 22,
    ];
    const tankVerts = x < 600 ? tankVertsRight : tankVertsLeft;

    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    if (isGun) {
      ctx.rotate(shape.angle);
      ctx.rect(
        -shape.width / (isGun ? 4 : 2),
        -shape.height / (isGun ? 8 : 4),
        shape.width,
        shape.height
      );
      ctx.moveTo(0, 0);
      ctx.lineTo(shape.width / 2, 0);
    } else {
      ctx.moveTo(tankVerts[0], tankVerts[1]);
      for (var i = 2; i < tankVerts.length - 1; i += 2) {
        ctx.lineTo(tankVerts[i], tankVerts[i + 1]);
      }
      ctx.closePath();
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
