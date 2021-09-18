using BL;
using DTO;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    
    [System.Web.Http.Cors.EnableCors("*","*","*")]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<UserDTO> Get()
        {
            return UserBL.GetAllUsers();
        }

        // GET api/values/5
        public UserDTO Get(int id)
        {
            return UserBL.GetUserById(id);
        }

        // POST api/values
        public void Post([FromBody] UserDTO user)
        {
            UserBL.AddUser(user);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
