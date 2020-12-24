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
    public class MagazinesController : ControllerBase
    {
        private readonly IDataService service;

        public MagazinesController(IDataService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Magazine>>> GetMagazines()
        {
            return await service.GetBooks<Magazine>().ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Magazine>> PostMagazine(Magazine book)
        {
            var dbBook = await service.PostBookAsnc(book);
            if (dbBook == null) return BadRequest();
            return dbBook;         
        } 

        [HttpPut("{id}")]
        public async Task<ActionResult<Magazine>> PutMagazine(Guid id,Magazine book)
        {
            var dbBook = await service.PutBookAsnc(id,book);
            if (dbBook == null) return BadRequest();
            return dbBook;         
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Magazine>> DeleteMagazine(Guid id)
        {
            var dbBook = await service.DeleteBookAsnc<Magazine>(id);
            if (dbBook == null) return BadRequest();
            return dbBook;
        }
    }
}
