using LibraryCommon.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryDAL
{
    public class LibraryContext : DbContext
    {
        public DbSet<AbstractBook> AllBooks { get; set; }
        public DbSet<Magazine> Magazines { get; set; }
        public DbSet<Novel> Novels { get; set; }
        public DbSet<StudyBook> StudyBooks { get; set; }

        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options)
        {
            Database.Migrate();
        }
    }
}
