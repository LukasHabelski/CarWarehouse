using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarWarehouseAPI.Data;
using CarWarehouseAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarWarehouseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly CarWarehouseContext _context;

        public AppointmentController(CarWarehouseContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAllAppointments()
        {
            return Ok(await _context.Appointments.ToListAsync());
        }

        [HttpGet("getAvailable")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAvailableAppointments()
        {
            var availableAppointments = await _context.Appointments
                .Where(a => !a.IsBooked)
                .ToListAsync();
            return Ok(availableAppointments);
        }

        [HttpGet("get/{id}")]
        public async Task<ActionResult<Appointment>> GetAppointmentById(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(appointment);
        }
[HttpPut("update/{id}")]
public async Task<IActionResult> UpdateAppointment(int id, [FromBody] Appointment updatedAppointment)
{
    var appointment = await _context.Appointments.FindAsync(id);

    if (appointment == null)
    {
        return NotFound();
    }

    // Ustaw datę na UTC
    appointment.Date = updatedAppointment.Date.ToUniversalTime();
    appointment.CustomerName = updatedAppointment.CustomerName;
    appointment.ServiceType = updatedAppointment.ServiceType;
    appointment.IsBooked = updatedAppointment.IsBooked;

    _context.Appointments.Update(appointment);
    await _context.SaveChangesAsync();

    return NoContent();
}



        [HttpPost("save")]
        public async Task<ActionResult<Appointment>> SaveAppointment([FromBody] Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.Id }, appointment);
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("between")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsBetweenDates([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            var appointments = await _context.Appointments
                .Where(a => a.Date >= start && a.Date <= end)
                .ToListAsync();
            return Ok(appointments);
        }

        [HttpPost("book/{id}")]
        public async Task<IActionResult> BookAppointment(int id, [FromQuery] string customerName, [FromQuery] string serviceType)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null || appointment.IsBooked)
            {
                return NotFound();
            }

            appointment.IsBooked = true;
            appointment.CustomerName = customerName;
            appointment.ServiceType = serviceType;

            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();

            return Ok(appointment);
        }
    }
}
