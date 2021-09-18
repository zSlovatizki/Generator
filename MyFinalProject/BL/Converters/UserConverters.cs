using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL.Converters
{
    public class UserConverters
    {
        public static UserDTO ConvertToDTO(T_User user)
        {
            UserDTO newUser = new UserDTO();
            newUser.userId = user.userId;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.phone = user.phone;
            newUser.password = user.password;
            newUser.Email = user.Email;
            newUser.address = user.address;
            newUser.ampereAmount = user.ampereAmount;
            newUser.generatorId = user.generatorId;
            newUser.status = user.status;
            return newUser;
        }

        public static T_User ConvertFromDTO(UserDTO user)
        {
            T_User newUser = new T_User();
            newUser.userId = user.userId;
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.phone = user.phone;
            newUser.password = user.password;
            newUser.Email = user.Email;
            newUser.address = user.address;
            newUser.ampereAmount = user.ampereAmount;
            newUser.generatorId = user.generatorId;
            newUser.status = user.status;
            return newUser;
        }

        public static IEnumerable<UserDTO> ConvertListToDTO(List<T_User> usersList)
        {
            foreach (T_User user in usersList)
            {
                yield return ConvertToDTO(user);
            }   
        }

        public static IEnumerable<T_User> ConvertListFromDTO(List<UserDTO> usersList)
        {
            foreach (UserDTO user in usersList)
            {
                yield return ConvertFromDTO(user);
            }
        }
    }
}
