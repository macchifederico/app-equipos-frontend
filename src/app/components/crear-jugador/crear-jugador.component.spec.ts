import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJugadorComponent } from './crear-jugador.component';

describe('CrearJugadorComponent', () => {
  let component: CrearJugadorComponent;
  let fixture: ComponentFixture<CrearJugadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearJugadorComponent]
    });
    fixture = TestBed.createComponent(CrearJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
