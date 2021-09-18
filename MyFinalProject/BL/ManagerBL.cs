using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ManagerBL
    {
        public static IEnumerable<ManagerDTO> GetAllManagers()
        {
            return Converters.ManagerConverters.ConvertListToDTO(ManagerDAL.GetAllManagers());
        }
        public static void AddManager(ManagerDTO manager)
        {
            ManagerDAL.AddManager(Converters.ManagerConverters.ConvertFromDTO(manager));
        }
    }
}
