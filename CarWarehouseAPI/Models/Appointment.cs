namespace CarWarehouseAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsBooked { get; set; }
        public string CustomerName { get; set; }
        public string ServiceType { get; set; }

    }
}
