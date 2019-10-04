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
    public class RoomReservationsController : ControllerBase
    {
        private readonly CrazyBooksDBContext _context;

        public RoomReservationsController(CrazyBooksDBContext context)
        {
            _context = context;
        }

        // GET: api/RoomReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomReservation>>> GetRoomReservations()
        {
            return await _context.RoomReservations.ToListAsync();
        }

        // GET: api/RoomReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomReservation>> GetRoomReservation(Guid id)
        {
            var roomReservation = await _context.RoomReservations.FindAsync(id);

            if (roomReservation == null)
            {
                return NotFound();
            }

            return roomReservation;
        }

        // PUT: api/RoomReservations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoomReservation(Guid id, RoomReservation roomReservation)
        {
            if (id != roomReservation.RoomId)
            {
                return BadRequest();
            }

            _context.Entry(roomReservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationExists(id))
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

        // POST: api/RoomReservations
        [HttpPost]
        public async Task<ActionResult<RoomReservation>> PostRoomReservation(RoomReservation roomReservation)
        {
            _context.RoomReservations.Add(roomReservation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoomReservationExists(roomReservation.RoomId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRoomReservation", new { id = roomReservation.RoomId }, roomReservation);
        }

        // DELETE: api/RoomReservations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RoomReservation>> DeleteRoomReservation(Guid id)
        {
            var roomReservation = await _context.RoomReservations.FindAsync(id);
            if (roomReservation == null)
            {
                return NotFound();
            }

            _context.RoomReservations.Remove(roomReservation);
            await _context.SaveChangesAsync();

            return roomReservation;
        }

        private bool RoomReservationExists(Guid id)
        {
            return _context.RoomReservations.Any(e => e.RoomId == id);
        }
    }
}
