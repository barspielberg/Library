using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryCommon.Models;
using LibraryDAL;

namespace LibraryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagazinesController : ControllerBase
    {
        private readonly LibraryContext _context;

        public MagazinesController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Magazines
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Magazine>>> GetMagazines()
        {
            return await _context.Magazines.ToListAsync();
        }

        // GET: api/Magazines/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Magazine>> GetMagazine(Guid id)
        {
            var magazine = await _context.Magazines.FindAsync(id);

            if (magazine == null)
            {
                return NotFound();
            }

            return magazine;
        }

        // PUT: api/Magazines/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMagazine(Guid id, Magazine magazine)
        {
            if (id != magazine.Id)
            {
                return BadRequest();
            }

            _context.Entry(magazine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MagazineExists(id))
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

        // POST: api/Magazines
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Magazine>> PostMagazine(Magazine magazine)
        {
            _context.Magazines.Add(magazine);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMagazine", new { id = magazine.Id }, magazine);
        }

        // DELETE: api/Magazines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMagazine(Guid id)
        {
            var magazine = await _context.Magazines.FindAsync(id);
            if (magazine == null)
            {
                return NotFound();
            }

            _context.Magazines.Remove(magazine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MagazineExists(Guid id)
        {
            return _context.Magazines.Any(e => e.Id == id);
        }
    }
}
