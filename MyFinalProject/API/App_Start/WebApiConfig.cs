using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApiContrib.Formatting.Jsonp;

namespace API
{
    public static class WebApiConfig
    {
       
        public static void Register(HttpConfiguration config)
        {
            //--------------------------
            //var jsonpFormatter = new JsonpMediaTypeFormatter(config.Formatters.JsonFormatter);
            //config.Formatters.Add(jsonpFormatter);
            //--------------------------


            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "GetById",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
               name: "GetAll",
               routeTemplate: "api/{controller}/{action}"
               //defaults: new { id = RouteParameter.Optional }
           );
           
            config.EnableCors();

           
        }
    }
}
