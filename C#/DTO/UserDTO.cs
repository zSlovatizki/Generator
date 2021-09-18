using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserDTO
    {
        public int userId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string address { get; set; }
        public string phone { get; set; }
        public string Email { get; set; }
        public double ampereAmount { get; set; }
        public string password { get; set; }
        public int generatorId { get; set; }
        public int status { get; set; }
    }
}
