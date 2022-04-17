import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () =>
      import('./features/pages/game/game.module').then((m) => m.GameModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dash',
    loadChildren: () =>
      import('./features/pages/dash/dash.module').then((m) => m.DashModule),
  },
  {
    path: 'cadastrar',
    loadChildren: () =>
      import('./features/pages/signup/signup.module').then(
        (m) => m.SignupModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
