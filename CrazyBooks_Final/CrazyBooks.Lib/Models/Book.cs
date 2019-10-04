using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CrazyBooks.Lib.Models
{
    public class Book : Entity
    {
        public string Title { get; set; }
    
        public string Author { get; set; }

        public DateTime? PublicationDate { get; set; }

        public int Edition { get; set; }
        [JsonIgnore]
        public ICollection<Lend> Lends { get; set; }
    }
}
