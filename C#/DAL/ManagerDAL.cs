using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ManagerDAL
    {
        public static List<T_managers> GetAllManagers()
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                return generatorEntities.T_managers.ToList();
            }
        }

        public static void AddManager(T_managers manager)
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                 generatorEntities.T_managers.Add(manager);
            }
        }
    }
}
