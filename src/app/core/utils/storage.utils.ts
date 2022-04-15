export class StorageUtils {
  public getStorage(key: string): any {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(atob(value)) : null;
  }

  public setStorage(key: string, value: any): void {
    	localStorage.setItem(key, btoa(JSON.stringify(value)));
  }

  public removeStorage(key: string): void {
    	localStorage.removeItem(key);
  }
}