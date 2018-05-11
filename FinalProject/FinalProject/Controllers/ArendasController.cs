using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProject.Data;
using FinalProject.Models;

namespace FinalProject.Controllers
{
    [Produces("application/json")]
    [Route("api/Arendas")]
    public class ArendasController : Controller
    {
        private readonly DataContext _context;

        public ArendasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Arendas
        [HttpGet]
        public IEnumerable<Arenda> GetArendas()
        {
            var model = _context.Arendas.Include(x => x.Raion).ToList();
            return _context.Arendas;
        }

        // GET: api/Arendas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetArenda([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var arenda = await _context.Arendas.SingleOrDefaultAsync(m => m.Id == id);

            if (arenda == null)
            {
                return NotFound();
            }

            return Ok(arenda);
        }

        // PUT: api/Arendas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArenda([FromRoute] int id, [FromBody] Arenda arenda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != arenda.Id)
            {
                return BadRequest();
            }

            _context.Entry(arenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArendaExists(id))
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

        // POST: api/Arendas
        [HttpPost]
        public async Task<IActionResult> PostArenda([FromBody] Arenda arenda)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Arendas.Add(arenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArenda", new { id = arenda.Id }, arenda);
        }

        // DELETE: api/Arendas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArenda([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var arenda = await _context.Arendas.SingleOrDefaultAsync(m => m.Id == id);
            if (arenda == null)
            {
                return NotFound();
            }

            _context.Arendas.Remove(arenda);
            await _context.SaveChangesAsync();

            return Ok(arenda);
        }

        private bool ArendaExists(int id)
        {
            return _context.Arendas.Any(e => e.Id == id);
        }
    }
}