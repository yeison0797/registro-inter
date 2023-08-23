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
  profesores: Profesore[] = [];
  materiasSeleccionadas: Materia[] = [];
  materiaSeleccionada: Materia | undefined;
  nombreEstudiante: string = '';


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.cargarMaterias();
    this.cargarEstudiantes();
    this.cargarProfesores();
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

      this.nombreEstudiante = data[0]?.nombre;
      console.log(this.estudiantes);
    }
      , error => console.error(error));
  }

  cargarProfesores() {
    this.http.get<Profesore[]>('/api/Profesores').subscribe(data => {
      this.profesores = data;
      console.log(this.profesores);
    }
      , error => console.error(error));
  }

  agregarMateriaSeleccionada() {
    if (this.materiaSeleccionada && this.materiasSeleccionadas.length < 3) {
      this.materiasSeleccionadas.push(this.materiaSeleccionada);
      this.materiaSeleccionada = undefined; // Limpia la selección después de agregarla
      console.log(this.materiasSeleccionadas);
    } else if (this.materiasSeleccionadas.length >= 3) {
      alert('¡Ya has seleccionado tres materias!');
    }
  }

  inscribirMaterias() {
    const estudianteId = this.estudiantes[0]?.estudianteId; // Usar el ID del estudiante seleccionado
    const materiasIds = this.materiasSeleccionadas.map(materia => materia.materiaId);

    const inscripcion = {
      estudianteId: estudianteId,
      materiasIds: materiasIds
    };

    this.http.post('/api/Clases/InscribirMaterias', inscripcion).subscribe(() => {
      alert('Materias inscritas correctamente');
      // Actualiza las materias inscritas para mostrar en la tabla
      this.cargarMateriasInscritas(estudianteId);
    }, error => {
      console.error(error);
      alert('Error al inscribir materias');
    });
  }

  cargarMateriasInscritas(estudianteId: number) {
    this.http.get<Materia[]>(`/api/Clases/MateriasInscritasPorEstudiante/${estudianteId}`).subscribe(data => {
      // Actualiza las materias inscritas
      this.materias = data;
      console.log(this.materias);
    }, error => {
      console.error(error);
      alert('Error al cargar las materias inscritas');
    });
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

interface Profesore {
  profesorId: number;
  nombre: string;
}

