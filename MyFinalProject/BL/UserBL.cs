using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL
{
    public class UserBL
    {
        public static UserDTO GetUserById(int id)
        {
            return Converters.UserConverters.ConvertToDTO(UsersDAL.GetUserById(id));
        }

        public static IEnumerable<UserDTO> GetAllUsers()
        {
            return Converters.UserConverters.ConvertListToDTO(UsersDAL.GetAllUsers());
        }

        public static void AddUser(UserDTO user)
        {
            UsersDAL.AddUser(Converters.UserConverters.ConvertFromDTO(user));
        }
    }
}
