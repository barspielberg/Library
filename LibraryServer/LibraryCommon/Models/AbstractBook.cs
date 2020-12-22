using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryCommon.Models
{
    public abstract class AbstractBook : IBook
    {
        public Guid Id { get; init; }

        public string Title { get; init; }

        public string Author { get; init; }

        public DateTime PublishDate { get; init; }

        public double Price { get; init; }
    }
}
