import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {  
  private contextUrl = `${environment.api.url}/participants`
  constructor(private httpClient: HttpClient) { }

  public getParticipant() {
    return this.httpClient.get<any>(`${this.contextUrl}`);
  }
  public postParticipant(data) {
    return this.httpClient.post<any>(this.contextUrl, data);
  }
  public removeParticipant(email) {
    return this.httpClient.delete<any>(`${this.contextUrl}/${email}`)
  }
}
