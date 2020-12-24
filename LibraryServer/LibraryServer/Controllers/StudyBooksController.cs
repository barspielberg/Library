using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryCommon.Models;
using LibraryDAL;
using LibraryCommon.API;

namespace LibraryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudyBooksController : ControllerBase
    {
        private readonly IDataService service;

        public StudyBooksController(IDataService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudyBook>>> GetStudyBook()
        {
            return await service.GetBooks<StudyBook>().ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<StudyBook>> PostStudyBook(StudyBook book)
        {
            var dbBook = await service.PostBookAsnc(book);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<StudyBook>> PutStudyBook(Guid id, StudyBook book)
        {
            var dbBook = await service.PutBookAsnc(id, book);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StudyBook>> DeleteStudyBook(Guid id)
        {
            var dbBook = await service.DeleteBookAsnc<StudyBook>(id);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }
    }
}
