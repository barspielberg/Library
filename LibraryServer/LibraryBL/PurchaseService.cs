using LibraryCommon.API;
using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryBL
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IDataService data;

        public PurchaseService(IDataService data)
        {
            this.data = data;
        }
        public async Task<bool> Purchase(CartItem[] items, double priceInDollars)
        {
            if (await Check(items, priceInDollars))
            {
                foreach (var item in items)
                {
                    await data.RemoveFromStockAsync(item.BookId, item.Amount);
                }
                return true;
            }
            return false;
        }

        private Task<bool> Check(CartItem[] items, double priceInDollars)
        {
            var books_amount = items.Select(i => (data.GetBook(i.BookId), i.Amount));
            var sumPrice = books_amount
                .Sum<(AbstractBook Book, uint Amount)>(i => 
                i.Book.Price * (1.0 - i.Book.Discount / 100.0) * i.Amount);

            var isAllInStock = books_amount.All<(AbstractBook Book, uint Amount)>(i => i.Book.InStock >= i.Amount);
            return Task.FromResult(isAllInStock && sumPrice == priceInDollars);
        }

    }
}
