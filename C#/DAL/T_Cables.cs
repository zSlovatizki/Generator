//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class T_Cables
    {
        public int cableId { get; set; }
        public double height { get; set; }
        public double width { get; set; }
        public string path { get; set; }
        public int generatorId { get; set; }
        public int typeId { get; set; }
        public int thickness { get; set; }
    
        public virtual T_Generators T_Generators { get; set; }
    }
}
