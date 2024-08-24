using System;
using System.Collections.Generic;

namespace CarWarehouseAPI.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalAmount { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }
}
