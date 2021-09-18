using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CableDAL
    {
        public static T_Cables GetCableById(int id)
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                return generatorEntities.T_Cables.Where(cable => cable.cableId == id).FirstOrDefault();
            }
        }

        public static List<T_Cables> GetAllCables()
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                return generatorEntities.T_Cables.ToList();
            }
        }

        public static void AddCable(T_Cables cable)
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                generatorEntities.T_Cables.Add(cable);
                generatorEntities.SaveChanges();
            }
        }
         
        public static List<T_Cables> GetCableByIdManager(int idManager)
        {
            List<int> generatorsByManager = new List<int>();
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                 generatorsByManager = generatorEntities.T_Generators.Where(g => g.managerId == idManager).Select(g => g.generatorId).ToList();
                 return generatorEntities.T_Cables.Where(cable => generatorsByManager.Any(idM => idM == cable.generatorId)).ToList();
            }
        }
    }
}

