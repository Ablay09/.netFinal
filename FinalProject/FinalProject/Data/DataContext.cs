using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject.Models;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Arenda> Arendas { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Kvartira> Kvartiras { get; set; }
        public DbSet<Raion> Raions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            foreach (var relationship in modelbuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            base.OnModelCreating(modelbuilder);
        }

        public DbSet<FinalProject.Models.Client> Client { get; set; }

        public DbSet<FinalProject.Models.Report> Report { get; set; }
    }
}
