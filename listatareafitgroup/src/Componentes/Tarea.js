import { useState } from 'react';

export function Tarea(props) {
    const {tareaId,descripcion,estado,onActualizarTarea,OnEliminarTarea} = props;
   
    const [editando, setEditando] = useState(false);
    const [estaCompletada,SetEstaCompleta] = useState(false);


    function ModoEdicionActivado() {

        const [valor, setValor] = useState(descripcion)
 
        function handleChange(e) {
            const texto = e.target.value;
            setValor(texto);
        }

       

        function handleClickActualizar(e) {
             e.preventDefault()
             onActualizarTarea(
                {
                    id: tareaId,
                    descripcion: valor,
                    estado: estado

                }
            )
            setEditando(false)
        }

        return(
            <>
                <input 
                    type="text"
                    onChange={handleChange}
                    value={valor}
                />
                <button className='btn' onClick={handleClickActualizar}>
                    Guardar
                </button>
            </>
        )
    }

    function ModoEdicionDesactivado() {
        return(
            <>
             <span className={estado ? "TodoTarea spanSubrayado" : "TodoTarea"} onClick={handleClickcambioEstado}>{descripcion}</span>
                <button className="btn btnEditar" onClick={()=> setEditando(true)}>
                    Editar
                </button>
            </>
        )
    }


    function handleClickcambioEstado(e) {
        e.preventDefault()
        onActualizarTarea(
           {
               id: tareaId,
               descripcion: descripcion,
               estado: !estado

           }
       )
       SetEstaCompleta(!estado)
   }

    return(

        <>
            <div className="contenedorTarea" id={tareaId}>
               {
                editando
                ? <ModoEdicionActivado/>
                : <ModoEdicionDesactivado />
               }
                
                <button className='btn btnBorrar' onClick={()=> OnEliminarTarea(tareaId)}>
                    X
                </button>


            </div>
        </>
    );
}