using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL.Converters
{
    public class CableConverters
    {
        public static CableDTO ConvertToDTO(T_Cables cable)
        {
            CableDTO newCable = new CableDTO();
            newCable.cableId = cable.cableId;
            newCable.generatorId = cable.generatorId;
            newCable.height = cable.height;
            newCable.width = cable.width;
            newCable.path = cable.path;
            newCable.typeId = cable.typeId;
            return newCable;
        }

        public static T_Cables ConvertFromDTO(CableDTO cable)
        {
            T_Cables newCable = new T_Cables();
            newCable.cableId = cable.cableId;
            newCable.generatorId = cable.generatorId;
            newCable.height = cable.height;
            newCable.width = cable.width;
            newCable.path = cable.path;
            newCable.typeId = cable.typeId;
            return newCable;
        }

        public static IEnumerable<CableDTO> ConvertListToDTO(List<T_Cables> cableList)
        {
            foreach (T_Cables cable in cableList)
            {
                yield return ConvertToDTO(cable);
            }
        }

        public static IEnumerable<T_Cables> ConvertListFromDTO(List<CableDTO> cableList)
        {
            foreach (CableDTO cable in cableList)
            {
                yield return ConvertFromDTO(cable);
            }
        }
    }
}
