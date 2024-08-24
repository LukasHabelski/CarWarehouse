using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarWarehouseAPI.Data;
using CarWarehouseAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarWarehouseAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagazineController : ControllerBase
    {
        private readonly CarWarehouseContext _context;

        public MagazineController(CarWarehouseContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Magazine>>> GetAllMagazines()
        {
            return Ok(await _context.Magazines.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Magazine>> GetMagazineById(int id)
        {
            var magazine = await _context.Magazines.FindAsync(id);

            if (magazine == null)
            {
                return NotFound();
            }

            return Ok(magazine);
        }

        [HttpPost]
        public async Task<ActionResult<Magazine>> AddMagazine([FromBody] Magazine magazine)
        {
            _context.Magazines.Add(magazine);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMagazineById), new { id = magazine.Id }, magazine);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMagazine(int id, [FromBody] Magazine magazine)
        {
            if (id != magazine.Id)
            {
                return BadRequest();
            }

            _context.Entry(magazine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MagazineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMagazine(int id)
        {
            var magazine = await _context.Magazines.FindAsync(id);

            if (magazine == null)
            {
                return NotFound();
            }

            _context.Magazines.Remove(magazine);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MagazineExists(int id)
        {
            return _context.Magazines.Any(e => e.Id == id);
        }
    }
}
