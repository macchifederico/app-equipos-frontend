import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface PlayerData {
  nombre?: string;
  apodo?: string;
  posicion1?: string;
  posicion2?: string;
  img_url?: string;
  tiro?: number;
  remate?: number;
  defensa?: number;
  velocidad?: number;
  gambeta?: number;
  fisico?: number;
  tecnica?: number;
  rusticidad?: number;
  temperamento?: number;
  lesiones?: number;
}

@Component({
  selector: 'app-player-preview',
  templateUrl: './player-preview.component.html',
  styleUrls: ['./player-preview.component.css']
})
export class PlayerPreviewComponent implements OnChanges {
  @Input() playerData: PlayerData = {};
  @Input() showTitle: boolean = true;

  overallRating: number = 0;
  strengthsAndWeaknesses: {strengths: string[], weaknesses: string[]} = {
    strengths: [],
    weaknesses: []
  };

  skillNames: {[key: string]: string} = {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerData']) {
      this.calculateOverallRating();
      this.calculateStrengthsAndWeaknesses();
    }
  }

  calculateOverallRating(): void {
    const skills = [
      this.playerData.tiro || 1,
      this.playerData.remate || 1,
      this.playerData.defensa || 1,
      this.playerData.velocidad || 1,
      this.playerData.gambeta || 1,
      this.playerData.fisico || 1,
      this.playerData.tecnica || 1,
      this.playerData.rusticidad || 1,
      this.playerData.temperamento || 1,
      (6 - (this.playerData.lesiones || 1)) // Invertir lesiones para que más alto sea mejor
    ];

    const sum = skills.reduce((acc, skill) => acc + skill, 0);
    this.overallRating = Math.round(sum / skills.length * 10) / 10; // Una decimal
  }

  calculateStrengthsAndWeaknesses(): void {
    const skills = {
      tiro: this.playerData.tiro || 1,
      remate: this.playerData.remate || 1,
      defensa: this.playerData.defensa || 1,
      velocidad: this.playerData.velocidad || 1,
      gambeta: this.playerData.gambeta || 1,
      fisico: this.playerData.fisico || 1,
      tecnica: this.playerData.tecnica || 1,
      rusticidad: this.playerData.rusticidad || 1,
      temperamento: this.playerData.temperamento || 1,
      lesiones: 6 - (this.playerData.lesiones || 1) // Invertir lesiones
    };

    // Encontrar fortalezas (4+ puntos)
    this.strengthsAndWeaknesses.strengths = Object.entries(skills)
      .filter(([_, value]) => value >= 4)
      .map(([key, _]) => this.skillNames[key])
      .slice(0, 3); // Máximo 3 fortalezas

    // Encontrar debilidades (2- puntos)
    this.strengthsAndWeaknesses.weaknesses = Object.entries(skills)
      .filter(([_, value]) => value <= 2)
      .map(([key, _]) => this.skillNames[key])
      .slice(0, 3); // Máximo 3 debilidades
  }

  getOverallColor(): string {
    if (this.overallRating >= 4.5) return '#28a745'; // Verde
    if (this.overallRating >= 3.5) return '#ffc107'; // Amarillo
    if (this.overallRating >= 2.5) return '#fd7e14'; // Naranja
    return '#dc3545'; // Rojo
  }

  getOverallLabel(): string {
    if (this.overallRating >= 4.5) return 'CRACK';
    if (this.overallRating >= 3.5) return 'Muy Bueno';
    if (this.overallRating >= 2.5) return 'Bueno';
    if (this.overallRating >= 1.5) return 'Básico';
    return 'Principiante';
  }

  getPlayerName(): string {
    if (this.playerData.nombre && this.playerData.apodo) {
      return `${this.playerData.nombre} "${this.playerData.apodo}"`;
    }
    return this.playerData.nombre || this.playerData.apodo || 'Nuevo Jugador';
  }

  getPlayerInitials(): string {
    const name = this.playerData.nombre || this.playerData.apodo || 'NN';
    return name.split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getPositionsText(): string {
    const pos1 = this.playerData.posicion1 || '';
    const pos2 = this.playerData.posicion2 || '';

    if (pos1 && pos2 && pos1 !== pos2) {
      return `${pos1} / ${pos2}`;
    }
    return pos1 || pos2 || 'Sin posición';
  }

  hasPlayerData(): boolean {
    return !!(this.playerData.nombre || this.playerData.apodo ||
             this.playerData.posicion1 || this.hasSkillData());
  }

  hasSkillData(): boolean {
    const skills = ['tiro', 'remate', 'defensa', 'velocidad', 'gambeta',
                   'fisico', 'tecnica', 'rusticidad', 'temperamento', 'lesiones'];
    return skills.some(skill => this.playerData[skill as keyof PlayerData]);
  }

  getSkillValue(skillName: string): number {
    return (this.playerData[skillName as keyof PlayerData] as number) || 1;
  }

  getSkillColor(value: number): string {
    const colors = ['', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#007bff'];
    return colors[value] || '#6c757d';
  }
}
