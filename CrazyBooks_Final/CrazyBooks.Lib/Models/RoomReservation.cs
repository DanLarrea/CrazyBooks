using Newtonsoft.Json;
using System;

namespace CrazyBooks.Lib.Models
{
    public class RoomReservation : Entity
    {
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User Users { get; set; }

        public Guid RoomId { get; set; }
        [JsonIgnore]
        public Room Rooms { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }

    }
}
