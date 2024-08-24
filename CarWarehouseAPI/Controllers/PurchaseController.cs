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
    public class PurchaseController : ControllerBase
    {
        private readonly CarWarehouseContext _context;

        public PurchaseController(CarWarehouseContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetAllPurchases()
        {
            return Ok(await _context.Purchases.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchaseById(int id)
        {
            var purchase = await _context.Purchases.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            return Ok(purchase);
        }

        [HttpPost]
        public async Task<ActionResult<Purchase>> AddPurchase([FromBody] Purchase purchase)
        {
            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPurchaseById), new { id = purchase.Id }, purchase);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchase(int id, [FromBody] Purchase purchase)
        {
            if (id != purchase.Id)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
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
        public async Task<IActionResult> DeletePurchase(int id)
        {
            var purchase = await _context.Purchases.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseExists(int id)
        {
            return _context.Purchases.Any(e => e.Id == id);
        }
    }
}
