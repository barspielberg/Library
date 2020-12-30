using LibraryCommon.API;
using LibraryCommon.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService service;

        public PurchaseController(IPurchaseService service)
        {
            this.service = service;
        }

        [HttpPost]
        public async Task<ActionResult> PostPurchase(CartItem[] items, double priceInDollars)
        {
            if (await service.Purchase(items, priceInDollars))
                return Ok();
            return BadRequest();
        }
    }
}
