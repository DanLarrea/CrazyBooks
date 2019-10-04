using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrazyBooks.Lib.DAL;
using CrazyBooks.Lib.Models;

namespace CrazyBooks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LendsController : ControllerBase
    {
        private readonly CrazyBooksDBContext _context;

        public LendsController(CrazyBooksDBContext context)
        {
            _context = context;
        }

        // GET: api/Lends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lend>>> GetLends()
        {
            return await _context.Lends.ToListAsync();
        }

        // GET: api/Lends/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lend>> GetLend(Guid id)
        {
            var lend = await _context.Lends.FindAsync(id);

            if (lend == null)
            {
                return NotFound();
            }

            return lend;
        }

        // PUT: api/Lends/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLend(Guid id, Lend lend)
        {
            if (id != lend.BookId)
            {
                return BadRequest();
            }

            _context.Entry(lend).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LendExists(id))
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

        // POST: api/Lends
        [HttpPost]
        public async Task<ActionResult<Lend>> PostLend(Lend lend)
        {
            lend.Id = Guid.NewGuid();
            _context.Lends.Add(lend);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LendExists(lend.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetLend", new { id = lend.BookId }, lend);
        }

        // DELETE: api/Lends/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lend>> DeleteLend(Guid id)
        {
            var lend = await _context.Lends.FindAsync(id);
            if (lend == null)
            {
                return NotFound();
            }

            _context.Lends.Remove(lend);
            await _context.SaveChangesAsync();

            return lend;
        }

        private bool LendExists(Guid id)
        {
            return _context.Lends.Any(e => e.BookId == id);
        }
    }
}
