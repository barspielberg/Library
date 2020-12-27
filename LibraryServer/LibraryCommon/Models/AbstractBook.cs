using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryCommon.Models
{
    public abstract class AbstractBook : IBook
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public DateTime PublishDate { get; set; }

        public double Price { get; set; }

        public uint InStock { get; set; }

        public uint Discount { get; set; }
    }
}
