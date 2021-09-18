using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CableDTO
    {
        public int cableId { get; set; }
        public double height { get; set; }
        public double width { get; set; }
        public string path { get; set; }
        public int generatorId { get; set; }
        public int typeId { get; set; }
    }
}
