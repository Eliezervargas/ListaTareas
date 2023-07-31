using CapaDato;
using CapaNegocio.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio.Implementacion
{
    public class LogicaTarea : ITarea
    {
        private FitGroupContext _Context;

        public LogicaTarea(FitGroupContext Context)
        {
            this._Context = Context;
        }

        public List<Tarea> GetTareas()
        {
            return _Context.Tareas.OrderByDescending(t => t.TareaId).ToList();
        }

        public List<Tarea> GetTareasEstado(int Estado)
        {
            if(Estado == 1)
                return _Context.Tareas.OrderByDescending(t => t.TareaId).ToList();
            else if(Estado == 2)
                return _Context.Tareas.Where(a => a.Estado == true).OrderByDescending(t => t.TareaId).ToList();
            else 
                return _Context.Tareas.Where(a => a.Estado == false).OrderByDescending(t => t.TareaId).ToList();

        }

        public List<Tarea> GetTareasDescripcion(string Descripcion)
        {
            return _Context.Tareas.Where(a => a.Descripcion == Descripcion).OrderByDescending(t => t.TareaId).ToList();
        }


        public bool Guardar(Tarea tarea)
        {
            try
            {
                _Context.Tareas.Add(tarea);
                _Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public bool Actualizar(Tarea tarea)
        {
            try
            {
                _Context.Entry(tarea).State = EntityState.Modified;
                _Context.SaveChanges();
                return true;

            }
            catch (Exception)
            {

                return false;               }

        }

        public bool Eliminar(int id)
        {
            try
            {
                var obj = _Context.Tareas.Find(id);
                if(obj != null)
                {
                    _Context.Tareas.Remove(obj);
                    _Context.SaveChanges();
                    return true;
                }else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
