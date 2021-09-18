using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UsersDAL
    {
        public static T_User GetUserById(int id)
        {
            using(GeneratorEntities generatorEntities =new GeneratorEntities())
            {
                return generatorEntities.T_User.Where(user => user.userId == id).FirstOrDefault();
            }
        }

        public static List<T_User> GetAllUsers()
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                return generatorEntities.T_User.ToList();
            }
        }

        public static void AddUser(T_User user)
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                generatorEntities.T_User.Add(user);
                generatorEntities.SaveChanges();
            }
        }
    }
}
