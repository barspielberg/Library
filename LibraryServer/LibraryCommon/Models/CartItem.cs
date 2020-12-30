using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryCommon.Models
{
    public class CartItem
    {
        public Guid BookId { get; set; }
        public uint Amount { get; set; }
    }
}
