import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private contextUrl = `${environment.api.url}/assets`;
  constructor(private httpClient: HttpClient) { }

  public getAssets() {
    return this.httpClient.get<any>(`${this.contextUrl}`);
  }
  public postAsset(data) {
    return this.httpClient.post<any>(this.contextUrl, data);
  }
}
