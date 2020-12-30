using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryCommon.API
{
    public interface IPurchaseService
    {
        Task<bool> Purchase(CartItem[] items, double priceInDollars);
    }
}
