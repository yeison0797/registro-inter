using System;
using System.Collections.Generic;

namespace registro_estudiantes.Models;

public partial class Materia
{
    public int MateriaId { get; set; }

    public string? Nombre { get; set; }

    public int? Creditos { get; set; }

    public virtual ICollection<Clase> Clases { get; set; } = new List<Clase>();
}
