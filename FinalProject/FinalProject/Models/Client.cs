using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ArendaId { get; set; }
        public virtual Arenda Arenda { get; set; }
    }
}
