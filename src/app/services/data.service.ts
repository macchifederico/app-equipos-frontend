import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL= "http://localhost:3000/api/jugadores";  

  constructor(private http: HttpClient) { }

  getAllPlayersByUserId(id_usuario: number): Observable<any>{    
    const body = {'id_usuario': id_usuario}
    return this.http.post<any>(this.API_URL, body);
  }

  updatePlayersTeamsId(teamOne: any, teamTwo: any): Observable<any>{
    const body = {
      'teamOne': teamOne,
      'teamTwo': teamTwo
    }
    return this.http.post<any>(`${this.API_URL}/update`, body);
  }

  getTeamsByUserId(id_usuario: number): Observable<any>{
    const body = {'id_usuario': id_usuario}
    return this.http.post<any>(`${this.API_URL}/teams`, body);
  }
}
