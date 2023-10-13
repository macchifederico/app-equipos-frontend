import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear-jugador.component.html',
  styleUrls: ['./crear-jugador.component.css']
})
export class CrearJugadorComponent {

  jugadorForm: FormGroup;

  constructor(private ds: DataService, private fb: FormBuilder, private route: Router) {
    this.jugadorForm = this.fb.group({
      nombre: '',
      apodo: '',
      posicion1: '',
      posicion2: '',
      tiro: '',
      remate: '',
      defensa: '',
      velocidad: '',
      gambeta: '',
      fisico: '',
      tecnica: '',
      rusticidad: '',
      temperamento: '',
      lesiones: '',
      img_url: ''
    })
  }

  ngOnInit(): void {
  }

  crearJugador(jugadorForm: any){
    let id_usuario = 1;
    this.ds.createPlayer(jugadorForm, id_usuario).subscribe({
      next: (data) => {
        this.route.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }
}
