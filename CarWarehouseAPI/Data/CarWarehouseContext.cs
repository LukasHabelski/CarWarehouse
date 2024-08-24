using Microsoft.EntityFrameworkCore;
using CarWarehouseAPI.Models;

namespace CarWarehouseAPI.Data
{
    public class CarWarehouseContext : DbContext
    {
        public CarWarehouseContext(DbContextOptions<CarWarehouseContext> options)
            : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Magazine> Magazines { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<Service> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Możesz tutaj konfigurować dodatkowe opcje, takie jak klucze obce i relacje
        }
    }
}
