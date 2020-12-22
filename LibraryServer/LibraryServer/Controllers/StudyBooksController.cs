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
    public class StudyBooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public StudyBooksController(LibraryContext context)
        {
            _context = context;
        }

        // GET: api/StudyBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyBook>>> GetStudyBooks()
        {
            return await _context.StudyBooks.ToListAsync();
        }

        // GET: api/StudyBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudyBook>> GetStudyBook(Guid id)
        {
            var studyBook = await _context.StudyBooks.FindAsync(id);

            if (studyBook == null)
            {
                return NotFound();
            }

            return studyBook;
        }

        // PUT: api/StudyBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudyBook(Guid id, StudyBook studyBook)
        {
            if (id != studyBook.Id)
            {
                return BadRequest();
            }

            _context.Entry(studyBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudyBookExists(id))
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

        // POST: api/StudyBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudyBook>> PostStudyBook(StudyBook studyBook)
        {
            _context.StudyBooks.Add(studyBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudyBook", new { id = studyBook.Id }, studyBook);
        }

        // DELETE: api/StudyBooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudyBook(Guid id)
        {
            var studyBook = await _context.StudyBooks.FindAsync(id);
            if (studyBook == null)
            {
                return NotFound();
            }

            _context.StudyBooks.Remove(studyBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudyBookExists(Guid id)
        {
            return _context.StudyBooks.Any(e => e.Id == id);
        }
    }
}
