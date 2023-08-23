using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using registro_estudiantes.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace registro_estudiantes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {
        private readonly RegistroEstudiantesContext _context;

        public MateriasController(RegistroEstudiantesContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Materia>>> GetMaterias()
        {
            return await _context.Materias.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Materia>> GetMateria(int id)
        {
            var materia = await _context.Materias.FindAsync(id);

            if (materia == null)
            {
                return NotFound();
            }

            return materia;
        }

        [HttpPost]
        public async Task<ActionResult<Materia>> PostMateria(Materia materia)
        {
            _context.Materias.Add(materia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMateria), new { id = materia.MateriaId }, materia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMateria(int id, Materia materia)
        {
            if (id != materia.MateriaId)
            {
                return BadRequest();
            }

            _context.Entry(materia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MateriaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMateria(int id)
        {
            var materia = await _context.Materias.FindAsync(id);
            if (materia == null)
            {
                return NotFound();
            }

            _context.Materias.Remove(materia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MateriaExists(int id)
        {
            return _context.Materias.Any(e => e.MateriaId == id);
        }
    }
}