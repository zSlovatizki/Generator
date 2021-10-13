using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL
{
    public class LoginRequestDAL
    {
        public static T_User Login(string userName, string userPassword)
        {
            using (GeneratorEntities generatorEntities = new GeneratorEntities())
            {
                return generatorEntities.T_User.Where(user => user.Email == userName && user.password == userPassword).FirstOrDefault();
            }
        }
    }
}
