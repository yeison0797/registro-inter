using System;
using System.Collections.Generic;

namespace registro_estudiantes.Models;

public partial class Estudiante
{
    public int EstudianteId { get; set; }

    public string? Nombre { get; set; }

    public string? Identificacion { get; set; }

    public virtual ICollection<Clase> Clases { get; set; } = new List<Clase>();
}
