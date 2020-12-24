using LibraryCommon.API;
using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryDAL
{
    public class LibraryRepository : IRepository
    {
        private readonly LibraryContext context;

        public LibraryRepository(LibraryContext context)
        {
            this.context = context;
        }

        public async Task<bool> DeleteBooksAsnc<T>(Guid[] ids) where T : AbstractBook
        {
            try
            {
                var dbBooks = ids.Select(i => FindBook<T>(i)).Where(b => b != null);

                if (dbBooks.Count() <= 0) return false;

                context.RemoveRange(dbBooks);
                await context.SaveChangesAsync();
                return true;
            }
            catch (Exception) { return false; }
        }

        public IQueryable<T> GetBooks<T>() where T : AbstractBook
        {
            return context.Set<T>();
        }

        public async Task<T> PostBookAsnc<T>(T book) where T : AbstractBook
        {
            try
            {
                book.Id = Guid.NewGuid();
                context.Add(book);
                await context.SaveChangesAsync();
                return FindBook<T>(book.Id); ;
            }
            catch (Exception) { return null; }
        }

        public async Task<T> PutBookAsnc<T>(Guid id, T book) where T : AbstractBook
        {
            try
            {
                if (id != book.Id) return null;
                var dbBook = FindBook<T>(id);
                dbBook.Price = book.Price;
                dbBook.Title = book.Title;
                dbBook.PublishDate = book.PublishDate;
                dbBook.Author = book.Author;

                await context.SaveChangesAsync();
                return FindBook<T>(id); ;
            }
            catch (Exception) { return null; }
        }

        private T FindBook<T>(Guid id) where T : AbstractBook
        {
            return context.Set<T>().FirstOrDefault(b => b.Id == id);
        }
    }
}
