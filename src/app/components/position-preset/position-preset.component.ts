import { Component, Output, EventEmitter } from '@angular/core';

interface PositionPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  primaryPosition: string;
  secondaryPosition: string;
  skills: {
    tiro: number;
    remate: number;
    defensa: number;
    velocidad: number;
    gambeta: number;
    fisico: number;
    tecnica: number;
    rusticidad: number;
    temperamento: number;
    lesiones: number;
  };
  gradient: string;
}

@Component({
  selector: 'app-position-preset',
  templateUrl: './position-preset.component.html',
  styleUrls: ['./position-preset.component.css']
})
export class PositionPresetComponent {
  @Output() presetSelected = new EventEmitter<PositionPreset>();

  presets: PositionPreset[] = [
    {
      id: 'arquero',
      name: 'Arquero',
      description: 'Guardameta con reflejos y manejo aéreo',
      icon: '🥅',
      primaryPosition: 'Arquero',
      secondaryPosition: 'Arquero',
      skills: {
        tiro: 2,
        remate: 1,
        defensa: 5,
        velocidad: 3,
        gambeta: 2,
        fisico: 4,
        tecnica: 3,
        rusticidad: 4,
        temperamento: 4,
        lesiones: 2
      },
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'defensor',
      name: 'Defensor',
      description: 'Sólido en el fondo, marca bien',
      icon: '🛡️',
      primaryPosition: 'Defensor',
      secondaryPosition: 'Mediocampista',
      skills: {
        tiro: 2,
        remate: 2,
        defensa: 5,
        velocidad: 3,
        gambeta: 2,
        fisico: 4,
        tecnica: 3,
        rusticidad: 5,
        temperamento: 4,
        lesiones: 2
      },
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'mediocampista',
      name: 'Mediocampo',
      description: 'Corazón del equipo, conecta todo',
      icon: '⚙️',
      primaryPosition: 'Mediocampista',
      secondaryPosition: 'Delantero',
      skills: {
        tiro: 4,
        remate: 3,
        defensa: 3,
        velocidad: 4,
        gambeta: 4,
        fisico: 4,
        tecnica: 5,
        rusticidad: 3,
        temperamento: 4,
        lesiones: 2
      },
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'delantero',
      name: 'Delantero',
      description: 'Goleador nato, define todo',
      icon: '⚽',
      primaryPosition: 'Delantero',
      secondaryPosition: 'Mediocampista',
      skills: {
        tiro: 5,
        remate: 5,
        defensa: 2,
        velocidad: 5,
        gambeta: 4,
        fisico: 3,
        tecnica: 4,
        rusticidad: 2,
        temperamento: 3,
        lesiones: 2
      },
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'extremo',
      name: 'Extremo',
      description: 'Velocidad pura por las bandas',
      icon: '💨',
      primaryPosition: 'Delantero',
      secondaryPosition: 'Mediocampista',
      skills: {
        tiro: 4,
        remate: 4,
        defensa: 2,
        velocidad: 5,
        gambeta: 5,
        fisico: 3,
        tecnica: 4,
        rusticidad: 2,
        temperamento: 3,
        lesiones: 3
      },
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 'todoterreno',
      name: 'Todoterreno',
      description: 'Equilibrado en todas las facetas',
      icon: '🔄',
      primaryPosition: 'Mediocampista',
      secondaryPosition: 'Defensor',
      skills: {
        tiro: 3,
        remate: 3,
        defensa: 4,
        velocidad: 3,
        gambeta: 3,
        fisico: 4,
        tecnica: 4,
        rusticidad: 4,
        temperamento: 4,
        lesiones: 2
      },
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    }
  ];

  selectedPreset: string | null = null;

  selectPreset(preset: PositionPreset): void {
    this.selectedPreset = preset.id;
    this.presetSelected.emit(preset);
  }

  isSelected(presetId: string): boolean {
    return this.selectedPreset === presetId;
  }

  clearSelection(): void {
    this.selectedPreset = null;
  }

  getSelectedPresetName(): string {
    if (!this.selectedPreset) return '';
    const preset = this.presets.find(p => p.id === this.selectedPreset);
    return preset?.name || '';
  }

  getSkillAverage(preset: PositionPreset): number {
    const skills = Object.values(preset.skills);
    const sum = skills.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / skills.length) * 10) / 10;
  }

  getTopSkills(preset: PositionPreset): string[] {
    const skillEntries = Object.entries(preset.skills);
    return skillEntries
      .filter(([_, value]) => value >= 4)
      .map(([key, _]) => this.getSkillLabel(key))
      .slice(0, 3);
  }

  getSkillLabel(skillKey: string): string {
    const labels: {[key: string]: string} = {
      tiro: 'Tiro',
      remate: 'Remate',
      defensa: 'Defensa',
      velocidad: 'Velocidad',
      gambeta: 'Gambeta',
      fisico: 'Físico',
      tecnica: 'Técnica',
      rusticidad: 'Rusticidad',
      temperamento: 'Temperamento',
      lesiones: 'Resistencia'
    };
    return labels[skillKey] || skillKey;
  }
}
