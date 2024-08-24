using System.Collections.Generic;

namespace CarWarehouseAPI.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<Purchase> Purchases { get; set; } = new List<Purchase>();
    }
}
