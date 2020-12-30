using LibraryCommon.API;
using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryBL
{
    public class DataService : IDataService
    {
        private readonly IRepository repository;

        public DataService(IRepository repository)
        {
            this.repository = repository;
        }

        public Task<bool> DeleteBooksAsnc<T>(Guid[] ids) where T : AbstractBook
        {
            return repository.DeleteBooksAsnc<T>(ids);
        }

        public IQueryable<T> GetBooks<T>() where T : AbstractBook
        {
            return repository.GetBooks<T>();
        }

        public AbstractBook GetBook(Guid id)
        {
            return repository.GetBook(id);
        }

        public Task<T> PostBookAsnc<T>(T book) where T : AbstractBook
        {
            return repository.PostBookAsnc(book);
        }

        public Task<T> PutBookAsnc<T>(Guid id, T book) where T : AbstractBook
        {
            return repository.PutBookAsnc(id, book);
        }

        public async Task<bool> RemoveFromStockAsync(Guid bookId, uint amount)
        {
            var book = GetBook(bookId);
            if (amount <= book.InStock)
            {
                book.InStock -= amount;
               await PutBookAsnc(bookId, book);
                return true;
            }
            return false;
        }
    }
}
