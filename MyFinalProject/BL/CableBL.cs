using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL
{
    public class CableBL
    {
        public static IEnumerable<CableDTO> GetAllCables()
        {
            return Converters.CableConverters.ConvertListToDTO(CableDAL.GetAllCables());
        }

        public static void AddCable(CableDTO cable)
        {
            CableDAL.AddCable(Converters.CableConverters.ConvertFromDTO(cable));
        }
        public static CableDTO GetCableById(int id)
        {
            return Converters.CableConverters.ConvertToDTO(CableDAL.GetCableById(id));
        }

        public static IEnumerable<CableDTO> GetCableByIdManager(int idManager)
        {
          return Converters.CableConverters.ConvertListToDTO(CableDAL.GetCableByIdManager(idManager));

        }
    }
}
