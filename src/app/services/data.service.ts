import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  @Output() enviaEquipos = new EventEmitter<any>();
  
  constructor() { }
}
