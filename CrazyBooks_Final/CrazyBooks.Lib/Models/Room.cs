using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CrazyBooks.Lib.Models
{
    public class Room : Entity
    {
        public string Code { get; set; }
        public string Color { get; set; }
        public string Capacity { get; set; }
        public int Accessible { get; set; }
        [JsonIgnore]
        public ICollection<RoomReservation> RoomReservations { get; set; }

    }
}
