import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // API_URL= "http://localhost:3000/api/jugadores";  
  API_URL= "https://app-equipos-backend-rtf8.vercel.app";

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

  createPlayer(jugador: any, id_usuario: number): Observable<any>{
    const body = {
      "jugador":{
        "id_usuario":   id_usuario,
        "id_equipo":    null,
        "nombre":       jugador.nombre,
        "apodo":        jugador.apodo,
        "posicion_1":   jugador.posicion1,
        "posicion_2":   jugador.posicion2,
        "img_url":      jugador.img_url,
        "habilidades":{
            "tiro":           Number(jugador.tiro),
            "remate":         Number(jugador.remate),
            "defensa":        Number(jugador.defensa),
            "velocidad":      Number(jugador.velocidad),
            "gambeta":        Number(jugador.gambeta),
            "estado_fisico":  Number(jugador.fisico),
            "tecnica":        Number(jugador.tecnica),
            "rusticidad":     Number(jugador.rusticidad),
            "temperamento":   Number(jugador.temperamento),
            "prop_lesiones":  Number(jugador.lesiones)
        },
        "promedioHabilidades": 0
    }
    }
    return this.http.post<any>(`${this.API_URL}/create`, body);
  
  }
}
