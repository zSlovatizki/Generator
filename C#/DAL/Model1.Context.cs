﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class GeneratorEntities : DbContext
    {
        public GeneratorEntities()
            : base("name=GeneratorEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<T_Cables> T_Cables { get; set; }
        public virtual DbSet<T_CreditDetails> T_CreditDetails { get; set; }
        public virtual DbSet<T_Generators> T_Generators { get; set; }
        public virtual DbSet<T_managers> T_managers { get; set; }
        public virtual DbSet<T_User> T_User { get; set; }
        public virtual DbSet<T_UserInDate> T_UserInDate { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
    }
}
