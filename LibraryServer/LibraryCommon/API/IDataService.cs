using LibraryCommon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryCommon.API
{
    public interface IDataService
    {
        IQueryable<T> GetBooks<T>() where T : IBook;
        Task<T> PostBookAsnc<T>(T book) where T : IBook;
        Task<T> DeleteBookAsnc<T>(Guid id) where T : IBook;
    }
}
