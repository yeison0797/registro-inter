import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter-component',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.commponent.css']
})
export class MateriasComponent {
  materias: Materia[] = [];
  estudiantes: Estudiante[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.cargarMaterias();
    this.cargarEstudiantes();
  }

  cargarMaterias() {
    this.http.get<Materia[]>('/api/Materias').subscribe(data => {
      this.materias = data;
      console.log(this.materias);
    }
      , error => console.error(error));
  }

  cargarEstudiantes() {
    this.http.get<Estudiante[]>('/api/Estudiantes').subscribe(data => {
      this.estudiantes = data;
      console.log(this.estudiantes);
    }
      , error => console.error(error));
  }
}

interface Materia {
  materiaId: number;
  nombre: string;
  creditos: number;
}

interface Estudiante {
  estudianteId: number;
  nombre: string;
  identificacion: number;
}

