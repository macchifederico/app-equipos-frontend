import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PlantelComponent } from './components/plantel/plantel.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrincipalComponent } from './components/principal/principal.component';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraficoComponent } from './components/grafico/grafico.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    PlantelComponent,
    TarjetaComponent,
    PrincipalComponent,
    CrearJugadorComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
