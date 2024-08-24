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
    public class ProductController : ControllerBase
    {
        private readonly CarWarehouseContext _context;

        public ProductController(CarWarehouseContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromBody] Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{productId}/connectWithPurchase/{purchaseId}")]
        public async Task<IActionResult> ConnectProductWithPurchase(int productId, int purchaseId)
        {
            var product = await _context.Products.FindAsync(productId);
            var purchase = await _context.Purchases.FindAsync(purchaseId);

            if (product == null || purchase == null)
            {
                return NotFound();
            }

            product.Purchases.Add(purchase);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{productId}/connectWithMagazine/{magazineId}")]
        public async Task<IActionResult> ConnectProductWithMagazine(int productId, int magazineId)
        {
            var product = await _context.Products.FindAsync(productId);
            var magazine = await _context.Magazines.FindAsync(magazineId);

            if (product == null || magazine == null)
            {
                return NotFound();
            }

            product.Magazines.Add(magazine);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("removeMagazine/{productId}/{magazineId}")]
        public async Task<IActionResult> RemoveProductFromMagazine(int productId, int magazineId)
        {
            var product = await _context.Products.FindAsync(productId);
            var magazine = await _context.Magazines.FindAsync(magazineId);

            if (product == null || magazine == null)
            {
                return NotFound();
            }

            product.Magazines.Remove(magazine);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
