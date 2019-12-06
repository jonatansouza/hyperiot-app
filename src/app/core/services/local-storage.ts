import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageProvider {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  getItem(key: string) {
    return localStorage.getItem(key);
  }
}
