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
    public class ClientController : ControllerBase
    {
        private readonly CarWarehouseContext _context;

        public ClientController(CarWarehouseContext context)
        {
            _context = context;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            return Ok(await _context.Clients.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpPost]
        public async Task<ActionResult<Client>> AddClient([FromBody] Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientById), new { id = client.Id }, client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
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

        [HttpGet("byName/{clientName}")]
        public async Task<ActionResult<IEnumerable<Client>>> GetClientsByName(string clientName)
        {
            var clients = await _context.Clients
                .Where(c => c.Name.Contains(clientName))
                .ToListAsync();
            return Ok(clients);
        }

        [HttpPatch("{clientId}/connectWithPurchase/{purchaseId}")]
        public async Task<IActionResult> ConnectClientWithPurchase(int clientId, int purchaseId)
        {
            var client = await _context.Clients.FindAsync(clientId);
            var purchase = await _context.Purchases.FindAsync(purchaseId);

            if (client == null || purchase == null)
            {
                return NotFound();
            }

            client.Purchases.Add(purchase);
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("disconnectWithPurchase/{purchaseId}")]
        public async Task<IActionResult> DisconnectClientFromPurchase(int purchaseId)
        {
            var clients = await _context.Clients
                .Where(c => c.Purchases.Any(p => p.Id == purchaseId))
                .ToListAsync();

            foreach (var client in clients)
            {
                client.Purchases.Remove(client.Purchases.First(p => p.Id == purchaseId));
                _context.Clients.Update(client);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("disconnectWithAll/{clientId}")]
        public async Task<IActionResult> DisconnectClientFromAllPurchases(int clientId)
        {
            var client = await _context.Clients.Include(c => c.Purchases).FirstOrDefaultAsync(c => c.Id == clientId);

            if (client == null)
            {
                return NotFound();
            }

            client.Purchases.Clear();
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }
    }
}
