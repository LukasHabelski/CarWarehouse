using System.Collections.Generic;

namespace CarWarehouseAPI.Models
{
    public class Magazine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
