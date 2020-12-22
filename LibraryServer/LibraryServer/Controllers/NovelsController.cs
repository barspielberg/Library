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
    public class NovelsController : ControllerBase
    {
        private readonly LibraryContext _context;

        public NovelsController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/Novels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Novel>>> GetNovels()
        {
            return await _context.Novels.ToListAsync();
        }

        // GET: api/Novels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Novel>> GetNovel(Guid id)
        {
            var novel = await _context.Novels.FindAsync(id);

            if (novel == null)
            {
                return NotFound();
            }

            return novel;
        }

        // PUT: api/Novels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNovel(Guid id, Novel novel)
        {
            if (id != novel.Id)
            {
                return BadRequest();
            }

            _context.Entry(novel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NovelExists(id))
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

        // POST: api/Novels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Novel>> PostNovel(Novel novel)
        {
            _context.Novels.Add(novel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNovel", new { id = novel.Id }, novel);
        }

        // DELETE: api/Novels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNovel(Guid id)
        {
            var novel = await _context.Novels.FindAsync(id);
            if (novel == null)
            {
                return NotFound();
            }

            _context.Novels.Remove(novel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NovelExists(Guid id)
        {
            return _context.Novels.Any(e => e.Id == id);
        }
    }
}
