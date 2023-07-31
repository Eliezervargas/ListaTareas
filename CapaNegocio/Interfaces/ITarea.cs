using CapaDato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio.Interfaces
{
    public interface ITarea
    {

        List<Tarea> GetTareas();

        List<Tarea> GetTareasEstado(int Estado);

        List<Tarea> GetTareasDescripcion(string Descripcion);

        bool Guardar(Tarea tarea);

        bool Actualizar(Tarea tarea);

        bool Eliminar(int id);

    }
}
