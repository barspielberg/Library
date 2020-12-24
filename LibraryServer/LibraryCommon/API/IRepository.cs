using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryCommon.API
{
    public interface IRepository
    {
        IQueryable<T> GetBooks<T>() where T : AbstractBook;
        Task<T> PostBookAsnc<T>(T book) where T : AbstractBook;
        Task<T> PutBookAsnc<T>(Guid id, T book) where T : AbstractBook;
        Task<bool> DeleteBooksAsnc<T>(Guid[] ids) where T : AbstractBook;      
    }
}
