using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject.Models
{
   
    public class Detail
    {
        public int Id { get; set; }
        public int KvartiraId { get; set; }
        public virtual Kvartira Kvartira { get; set; }
        public int ArendaId { get; set; }
        public virtual Arenda Arenda {get; set;}

    }
}
