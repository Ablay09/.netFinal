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
    [Route("api/Kvartiras")]
    public class KvartirasController : Controller
    {
        private readonly DataContext _context;

        public KvartirasController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Kvartiras
        [HttpGet]
        public IEnumerable<Kvartira> GetKvartiras()
        {
            var model = _context.Kvartiras.Include(x => x.Raion).ToList();
            return model;
        }

        // GET: api/Kvartiras/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetKvartira([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kvartira = await _context.Kvartiras.Include(x=>x.Raion).SingleOrDefaultAsync(m => m.Id == id);

            if (kvartira == null)
            {
                return NotFound();
            }

            return Ok(kvartira);
        }

        // PUT: api/Kvartiras/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKvartira([FromRoute] int id, [FromBody] Kvartira kvartira)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kvartira.Id)
            {
                return BadRequest();
            }

            _context.Entry(kvartira).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KvartiraExists(id))
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

        // POST: api/Kvartiras
        [HttpPost]
        public async Task<IActionResult> PostKvartira([FromBody] Kvartira kvartira)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Kvartiras.Add(kvartira);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKvartira", new { id = kvartira.Id }, kvartira);
        }

        // DELETE: api/Kvartiras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKvartira([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var kvartira = await _context.Kvartiras.SingleOrDefaultAsync(m => m.Id == id);
            if (kvartira == null)
            {
                return NotFound();
            }

            _context.Kvartiras.Remove(kvartira);
            await _context.SaveChangesAsync();

            return Ok(kvartira);
        }

        private bool KvartiraExists(int id)
        {
            return _context.Kvartiras.Any(e => e.Id == id);
        }
    }
}