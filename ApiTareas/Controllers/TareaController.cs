using CapaDato;
using CapaNegocio.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiTareas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        ITarea _Tarea;

        public TareaController(ITarea Tarea)
        {
            this._Tarea = Tarea;
        }


        [HttpGet]
        [Route ("Lista")]
        public ActionResult Lista()
        {
            var ListaResul = _Tarea.GetTareas();
          
            return StatusCode(StatusCodes.Status200OK,ListaResul);
        }

        [HttpGet]
        [Route("ListaXEstado")]
        public ActionResult ListaEstado(int Estado)
        {
            var ListaResul = _Tarea.GetTareasEstado(Estado);

            return StatusCode(StatusCodes.Status200OK, ListaResul);
        }

        [HttpGet]
        [Route("BuscarenLista")]
        public ActionResult BuscarenLista(string Descripcion)
        {
            var ListaResul = _Tarea.GetTareasDescripcion(Descripcion);

            return StatusCode(StatusCodes.Status200OK, ListaResul);
        }


        [HttpPost]
        [Route("Guardar")]
        public  ActionResult Guardar([FromBody] Tarea request)
        {
            if (_Tarea.Guardar(request))
                return StatusCode(StatusCodes.Status200OK, request);
            else
                return StatusCode(StatusCodes.Status400BadRequest, "");

        }

        [HttpPut]
        [Route("Actualizar")]
        public ActionResult Actualizar(int id, [FromBody] Tarea request)
        {
            if (id == request.TareaId)
            {
                if (_Tarea.Actualizar(request))
                    return StatusCode(StatusCodes.Status200OK, request);
            }

            return StatusCode(StatusCodes.Status400BadRequest, "");


        }

        [HttpDelete]
        [Route("Eliminar")]
        public ActionResult Eliminar(int id)
        {
            if (_Tarea.Eliminar(id))
                return StatusCode(StatusCodes.Status200OK, "ok");
            else
                return StatusCode(StatusCodes.Status400BadRequest, "");

        }


    }
}
