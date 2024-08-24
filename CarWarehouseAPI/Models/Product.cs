using System.Collections.Generic;

namespace CarWarehouseAPI.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public List<Magazine> Magazines { get; set; } = new List<Magazine>();
        public List<Purchase> Purchases { get; set; } = new List<Purchase>();
    }
}
