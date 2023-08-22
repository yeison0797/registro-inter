import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html'
})
export class EstudiantesComponent {
  estudiantes: Estudiante[] = [];
  nuevoEstudiante: Estudiante = { estudianteId: 0, nombre: '' };
  estudianteEnEdicion: Estudiante | null = null;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.http.get<Estudiante[]>('/api/Estudiantes').subscribe(data => {
      this.estudiantes = data;
    }, error => console.error(error));
  }

  agregarEstudiante() {
    this.http.post('/api/Estudiantes', this.nuevoEstudiante).subscribe(() => {
      this.nuevoEstudiante = { estudianteId: 0, nombre: '' };
      this.cargarEstudiantes();
    }, error => console.error(error));
  }

  editarEstudiante(estudiante: Estudiante) {
    this.estudianteEnEdicion = { ...estudiante };
  }

  guardarCambios() {
    if (this.estudianteEnEdicion) {
      this.http.put(`/api/Estudiantes/${this.estudianteEnEdicion.estudianteId}`, this.estudianteEnEdicion).subscribe(() => {
        this.estudianteEnEdicion = null;
        this.cargarEstudiantes();
      }, error => console.error(error));
    }
  }

  cancelarEdicion() {
    this.estudianteEnEdicion = null;
  }

  eliminarEstudiante(estudiante: Estudiante) {
    this.http.delete(`/api/Estudiantes/${estudiante.estudianteId}`).subscribe(() => {
      this.cargarEstudiantes();
    }, error => console.error(error));
  }
}

interface Estudiante {
  estudianteId: number;
  nombre: string;
}
