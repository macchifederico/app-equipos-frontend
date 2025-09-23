import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SkillConfig {
  name: string;
  label: string;
  description: string;
  icon?: string;
  color?: string;
}

@Component({
  selector: 'app-skill-slider',
  templateUrl: './skill-slider.component.html',
  styleUrls: ['./skill-slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkillSliderComponent),
      multi: true
    }
  ]
})
export class SkillSliderComponent implements ControlValueAccessor {
  @Input() config: SkillConfig = {
    name: 'skill',
    label: 'Habilidad',
    description: 'Evalúa del 1 al 5'
  };
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<number>();

  value: number = 1;
  
  // Labels para los valores
  skillLabels = ['', 'Principiante', 'Básico', 'Bueno', 'Muy Bueno', 'Crack'];
  
  // Para ControlValueAccessor
  onChange = (value: number) => {};
  onTouched = () => {};

  // Métodos para ControlValueAccessor
  writeValue(value: number): void {
    if (value !== undefined && value !== null) {
      this.value = Math.max(1, Math.min(5, value));
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Métodos del componente
  onSliderChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value);
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    this.onTouched();
  }

  onStarClick(starValue: number): void {
    if (!this.disabled) {
      this.value = starValue;
      this.onChange(starValue);
      this.valueChange.emit(starValue);
      this.onTouched();
    }
  }

  increment(): void {
    if (!this.disabled && this.value < 5) {
      this.value++;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
      this.onTouched();
    }
  }

  decrement(): void {
    if (!this.disabled && this.value > 1) {
      this.value--;
      this.onChange(this.value);
      this.valueChange.emit(this.value);
      this.onTouched();
    }
  }

  getStarClass(starNumber: number): string {
    return starNumber <= this.value ? 'star-filled' : 'star-empty';
  }

  getSliderColor(): string {
    const colors = ['', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#007bff'];
    return this.config.color || colors[this.value] || '#6c757d';
  }
}
