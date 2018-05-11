using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject.Models
{
    public class Kvartira
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public double Price { get; set; }
        public virtual Raion Raion { get; set; }
        public int RaionId { get; set; }
    }
}
