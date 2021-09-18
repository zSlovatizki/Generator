using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [System.Web.Http.Cors.EnableCors("*", "*", "*")]
    public class CableController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<CableDTO> Get()
        {
            return BL.CableBL.GetAllCables();
        }

        // GET api/<controller>/5
        //public CableDTO Get(int id)
        //{
        //    return BL.CableBL.GetCableById(id);
        //}

        // GET api/<controller>/5
        public IEnumerable<CableDTO> Get(int idManager)
        {
            return BL.CableBL.GetCableByIdManager(idManager);
        }

        // POST api/<controller>
        public void AddCable([FromBody]int cableId )
        {
            CableDTO cable = new CableDTO();
            cable.cableId = cableId;
            //cable.height = height;
            //cable.width = width;
            //cable.path = path;
            //cable.generatorId = generatorId;
            //cable.typeId = typeId;
            CableBL.AddCable(cable);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}