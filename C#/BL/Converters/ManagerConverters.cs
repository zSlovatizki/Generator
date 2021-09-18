using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Converters
{
   public class ManagerConverters
    {
        public static ManagerDTO ConvertToDTO(T_managers manager)
        {
            ManagerDTO newManager = new ManagerDTO();
            newManager.Email = manager.Email;
            newManager.menagerId = manager.menagerId;
            newManager.password = manager.password;
            return newManager;
        }

        public static T_managers ConvertFromDTO(ManagerDTO manager)
        {
            T_managers newManager = new T_managers();
            newManager.Email = manager.Email;
            newManager.menagerId = manager.menagerId;
            newManager.password = manager.password;
            return newManager;
        }
        public static IEnumerable<ManagerDTO> ConvertListToDTO(List<T_managers> managersList)
        {
            foreach (T_managers manager in managersList)
            {
                yield return ConvertToDTO(manager);
            }
        }

        public static IEnumerable<T_managers> ConvertListFromDTO(List<ManagerDTO> managerList)
        {
            foreach (ManagerDTO manager in managerList)
            {
                yield return ConvertFromDTO(manager);
            }
        }
    }
}
