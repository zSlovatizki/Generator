using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BL;
using DTO;

namespace API.Controllers
{
    [System.Web.Http.Cors.EnableCors("*", "*", "*")]
    public class LogInController : ApiController
    {
        // GET: LogIn
        [HttpPost]
        public HttpResponseMessage PostLogin(LoginRequestBL loginRequest)
        {
            UserDTO user = LoginRequestBL.Login(loginRequest);
            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }
    }
}