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
    
    public partial class T_CreditDetails
    {
        public int creditId { get; set; }
        public string creditNumber { get; set; }
        public System.DateTime creditValidity { get; set; }
        public string creditCVV { get; set; }
        public string creditTZ { get; set; }
        public string creditName { get; set; }
        public int userId { get; set; }
    
        public virtual T_User T_User { get; set; }
    }
}
