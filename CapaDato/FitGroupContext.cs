using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDato
{
    public class FitGroupContext : DbContext
    {
        public FitGroupContext(DbContextOptions <FitGroupContext> options): base (options)
        {
                
        }

        public DbSet<Tarea> Tareas { get; set; }    

    }
}
