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
    public class NovelsController : ControllerBase
    {
        private readonly IDataService service;

        public NovelsController(IDataService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Novel>>> GetNovels()
        {
            return await service.GetBooks<Novel>().ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Novel>> PostNovel(Novel book)
        {
            var dbBook = await service.PostBookAsnc(book);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Novel>> PutNovel(Guid id, Novel book)
        {
            var dbBook = await service.PutBookAsnc(id, book);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Novel>> DeleteNovel(Guid id)
        {
            var dbBook = await service.DeleteBookAsnc<Novel>(id);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }
    }
}
