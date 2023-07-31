import axios from "axios";
import { useState, useEffect } from 'react';
import './App.css';
import {Formulario} from './Componentes/Formulario'
import {Tarea} from './Componentes/Tarea'
import {FormGroup, Label, Input} from "reactstrap";



function App() {

  const baseURL = "https://localhost:7115/api/tarea/"
  const [tarea,setTarea] = useState('')
  const [Filtro,setFiltro] = useState('')
  const [listadoTareas, setListadoTareas] = useState([]) // estyo para manejar la aplicacion con un arreglo

  //para manejo de los chk
  const [isChecked, setIsChecked] = useState(false);


  const mostrarTareas = () => {
    axios.get(baseURL + "Lista").then((response) => {
      setListadoTareas(response.data);
      console.log(response);
    });
  }


  useEffect(() => {
    mostrarTareas();
  }, [])



  function handleSutmit(e) { //Agregar nueva tarea
    e.preventDefault();

    if(tarea == ''){
      alert('No se puede agregar una tarea vacia');
      return
    }

    const configuracionPost = {

      method: 'POST',
      url: baseURL +  'Guardar',
      data: {
        TareaId: 0,
        Descripcion: tarea,
        Estado: false
      }
    }
    console.log(configuracionPost);


  axios(configuracionPost)
    .then(res => {
      console.log(res.data);
      setTarea(''); //limpio la caja de texto
      mostrarTareas();
    });

  }

  
  function handleSutmitFiltrar(e) { //Agregar nueva tarea
    e.preventDefault();

    if(Filtro == ''){
      alert('No se puede Buscar una tarea vacia');
      return
    }

    axios.get(baseURL + "BuscarenLista?Descripcion=" + Filtro).then((response) => {
      setListadoTareas(response.data);
      setFiltro('');
    });

    
  }


  function handleChange(e) {
    setTarea(e.target.value);
  }

  function handleChangeFiltrar(e) {
    setFiltro(e.target.value);
  }


  function onActualizarTarea(variables) {
    const {id,descripcion,estado} = variables;
    
    const TareaModificada = { 
      TareaId: id,
      Descripcion: descripcion,
      Estado: estado
    };

    
    axios.put(baseURL + "Actualizar?id=" + id ,TareaModificada)
    .then(response => {
      console.log(response.data);
      setTarea(''); //limpio la caja de texto
      mostrarTareas();
    });


  }


  function OnEliminarTarea(id) {
    console.log(id);
    axios.delete(baseURL + "Eliminar?id=" + id ).then((response) => {
      console.log(response);
      mostrarTareas();
    });
    
  }




function MostrarTareaEstado(status) {
  axios.get(baseURL + "ListaXEstado?Estado=" + status).then((response) => {
    setListadoTareas(response.data);
  });

}


  return (
    <>
    <div className='contenedorPrincipal'>
      <h1>Listado de Tareas</h1>

      <div className='contenedorFormulario'>
        <Formulario 
        tarea = {tarea}
        handleSutmit = {handleSutmit}
        handleChange = {handleChange}
        Filtro = {Filtro}
        handleSutmitFiltrar = {handleSutmitFiltrar}
        handleChangeFiltrar = {handleChangeFiltrar}
        />
      </div>

      <div className='contenedorTareas'>
        <h2>Tareas</h2>
        <div className='contenedorInfoTareas'>
          {
            listadoTareas.map(tarea => (
              <Tarea 
                Key={tarea.tareaId}
                tareaId={tarea.tareaId}
                descripcion={tarea.descripcion}
                estado={tarea.estado}
                onActualizarTarea={onActualizarTarea}
                OnEliminarTarea={OnEliminarTarea}
              />
            ))
          }
        </div>
        <br></br>
        <div>      
            <div className="formGroupBotonesFiltrar">
              <div className="col-ms-4">
              <button className='btn' onClick={()=> MostrarTareaEstado(1)}>
                    Mostrar Todas
                </button>
              </div>
              <div className="col-ms-4">
              <button className='btn' onClick={()=> MostrarTareaEstado(2)}>
                    Completadas
                </button>
              </div>
              <div className="col-ms-4">
              <button className='btn' onClick={()=> MostrarTareaEstado(3)}>
                    No Completadas
                </button>
              </div>
  
            </div>
            <br></br>

        </div>


      </div>


    </div>
    </>
  );
}

export default App;
