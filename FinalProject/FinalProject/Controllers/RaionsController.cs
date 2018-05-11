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
    [Route("api/Raions")]
    public class RaionsController : Controller
    {
        private readonly DataContext _context;

        public RaionsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Raions
        [HttpGet]
        public IEnumerable<Raion> GetRaions()
        {
            return _context.Raions;
        }

        // GET: api/Raions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRaion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var raion = await _context.Raions.SingleOrDefaultAsync(m => m.Id == id);

            if (raion == null)
            {
                return NotFound();
            }

            return Ok(raion);
        }

        // PUT: api/Raions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRaion([FromRoute] int id, [FromBody] Raion raion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != raion.Id)
            {
                return BadRequest();
            }

            _context.Entry(raion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RaionExists(id))
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

        // POST: api/Raions
        [HttpPost]
        public async Task<IActionResult> PostRaion([FromBody] Raion raion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Raions.Add(raion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRaion", new { id = raion.Id }, raion);
        }

        // DELETE: api/Raions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRaion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var raion = await _context.Raions.SingleOrDefaultAsync(m => m.Id == id);
            if (raion == null)
            {
                return NotFound();
            }

            _context.Raions.Remove(raion);
            await _context.SaveChangesAsync();

            return Ok(raion);
        }

        private bool RaionExists(int id)
        {
            return _context.Raions.Any(e => e.Id == id);
        }
    }
}