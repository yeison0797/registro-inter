using System;
using System.Collections.Generic;

namespace registro_estudiantes.Models;

public partial class Profesore
{
    public int ProfesorId { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Clase> Clases { get; set; } = new List<Clase>();
}
