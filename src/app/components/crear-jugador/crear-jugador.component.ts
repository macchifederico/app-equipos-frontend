import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

interface PlayerFormData {
  nombre?: string;
  apodo?: string;
  posicion1?: string;
  posicion2?: string;
  img_url?: string;
  tiro?: number;
  remate?: number;
  defensa?: number;
  velocidad?: number;
  fisico?: number;
  tecnica?: number;
}

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear-jugador.component.html',
  styleUrls: ['./crear-jugador.component.css']
})
export class CrearJugadorComponent implements OnInit {

  jugadorForm: FormGroup = new FormGroup({});
  currentStep: number = 1;
  totalSteps: number = 3;
  isSubmitting: boolean = false;

  // Para la vista previa en tiempo real
  previewData: PlayerFormData = {};

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.configurarSuscripciones();
  }

  private inicializarFormulario(): void {
    this.jugadorForm = this.fb.group({
      // Información básica
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apodo: ['', [Validators.required, Validators.minLength(2)]],
      posicion1: ['', Validators.required],
      posicion2: [''],
      img_url: [''],

      // Habilidades principales (simplificadas)
      tiro: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      remate: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      defensa: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      velocidad: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      tecnica: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      fisico: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  private configurarSuscripciones(): void {
    this.jugadorForm.valueChanges.subscribe(value => {
      this.previewData = { ...value };
    });
  }

  // Navegación entre pasos
  nextStep(): void {
    if (this.canProceedToNextStep()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Validaciones
  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.jugadorForm.get('nombre')?.valid === true &&
               this.jugadorForm.get('apodo')?.valid === true &&
               this.jugadorForm.get('posicion1')?.valid === true;
      case 2:
        return this.jugadorForm.get('tiro')?.valid === true &&
               this.jugadorForm.get('remate')?.valid === true &&
               this.jugadorForm.get('defensa')?.valid === true &&
               this.jugadorForm.get('velocidad')?.valid === true &&
               this.jugadorForm.get('tecnica')?.valid === true &&
               this.jugadorForm.get('fisico')?.valid === true;
      case 3:
        return this.jugadorForm.valid;
      default:
        return false;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.jugadorForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.jugadorForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['min']) {
        return `Valor mínimo: ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `Valor máximo: ${field.errors['max'].max}`;
      }
    }
    return '';
  }

  // Helpers para el template
  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Información Básica';
      case 2:
        return 'Habilidades';
      case 3:
        return 'Confirmación';
      default:
        return '';
    }
  }

  // Navegación
  goBack(): void {
    this.location.back();
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.jugadorForm.valid && !this.isSubmitting) {
      this.crearJugador();
    }
  }

  private crearJugador(): void {
    this.isSubmitting = true;

    // Necesitamos obtener el id_usuario. Por ahora usaremos 1 como valor por defecto
    const id_usuario = 1; // En una aplicación real, esto vendría del servicio de autenticación

    const jugadorData = {
      ...this.jugadorForm.value,
      // Valores por defecto para campos no incluidos en el formulario simplificado
      gambeta: 3,
      rusticidad: 3,
      temperamento: 3,
      lesiones: 3
    };

    // Crear un FormGroup mock para que el servicio funcione correctamente
    const mockFormGroup = {
      value: jugadorData
    };

    this.dataService.createPlayer(mockFormGroup, id_usuario).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        Swal.fire({
          title: '¡Jugador creado exitosamente!',
          text: `${jugadorData.nombre} ha sido agregado al sistema`,
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#4f46e5'
        }).then(() => {
          this.router.navigate(['/principal']);
        });
      },
      error: (error: any) => {
        this.isSubmitting = false;
        console.error('Error al crear jugador:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el jugador. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }

  // Para resetear el formulario (opcional)
  resetForm(): void {
    this.jugadorForm.reset();
    this.currentStep = 1;
    this.inicializarFormulario();
  }
}
