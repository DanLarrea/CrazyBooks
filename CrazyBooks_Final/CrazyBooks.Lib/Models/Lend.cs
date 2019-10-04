using Newtonsoft.Json;
using System;

namespace CrazyBooks.Lib.Models
{
    public class Lend : Entity
    {
        public DateTime? LendedOn { get; set; }
        public DateTime? ReturnDate { get; set; }
        public Guid UserId { get; set; }

        [JsonIgnore]
        public User Users { get; set; }

        public Guid BookId { get; set; }
        [JsonIgnore]
        public Book Books { get; set; }

    }
}
