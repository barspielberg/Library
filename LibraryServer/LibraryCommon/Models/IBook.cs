using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryCommon.Models
{
    public interface IBook
    {
        Guid Id { get; }
        string Title { get; }
        string Author { get; }
        DateTime PublishDate { get; }
        double Price { get; }

    }
}
