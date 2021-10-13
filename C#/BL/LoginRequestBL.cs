using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public class LoginRequestBL
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public static UserDTO Login(LoginRequestBL loginUser)
        {
            return Converters.UserConverters.ConvertToDTO( LoginRequestDAL.Login(loginUser.UserName,loginUser.UserPassword));
        }
    }
}
