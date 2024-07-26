import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem<Type>(key: string, item: Type) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public getItem<Type>(key: string): Type {
    let strItem = localStorage.getItem(key);

    if (strItem == null) throw new Error(`Cant get item by key: ${key}`);
    return JSON.parse(strItem) as Type;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearAll() {
    localStorage.clear();
  }

  public hasItem(key: string): boolean {
    return localStorage.getItem(key) != null;
  }
}
