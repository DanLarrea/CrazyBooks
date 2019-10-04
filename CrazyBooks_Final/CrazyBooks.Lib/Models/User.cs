using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace CrazyBooks.Lib.Models
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Dni { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Token { get; set; }
        [JsonIgnore]
        public ICollection<RoomReservation> RoomReservations { get; set; }
        [JsonIgnore]
        public ICollection<Lend> Lends { get; set; }
    }
}
