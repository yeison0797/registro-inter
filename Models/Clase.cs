using System;
using System.Collections.Generic;

namespace registro_estudiantes.Models;

public partial class Clase
{
    public int ClaseId { get; set; }

    public int EstudianteId { get; set; }

    public int MateriaId { get; set; }

    public int ProfesorId { get; set; }

    public virtual Estudiante? Estudiante { get; set; }

    public virtual Materia? Materia { get; set; }

    public virtual Profesore? Profesor { get; set; }
}
