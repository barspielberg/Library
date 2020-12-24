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

        public Task<T> DeleteBookAsnc<T>(Guid id) where T : AbstractBook
        {
            return repository.DeleteBookAsnc<T>(id);
        }

        public IQueryable<T> GetBooks<T>() where T : AbstractBook
        {
            return repository.GetBooks<T>();
        }

        public Task<T> PostBookAsnc<T>(T book) where T : AbstractBook
        {
            return repository.PostBookAsnc<T>(book);
        }

        public Task<T> PutBookAsnc<T>(Guid id, T book) where T : AbstractBook
        {
            return repository.PutBookAsnc(id, book);
        }
    }
}
