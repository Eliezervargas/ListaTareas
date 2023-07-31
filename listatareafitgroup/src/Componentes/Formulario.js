export function Formulario(props) {

    const {tarea,handleSutmit, handleChange,Filtro,handleSutmitFiltrar, handleChangeFiltrar} = props

    return(
        <>
            <form onSubmit={handleSutmit}>
                <input
                    type="text"
                    placeholder="Nueva Tarea"
                    onChange={handleChange}
                    value={tarea}
                />

                <input
                    type="submit"
                    className="btn"
                    value="Agregar"
                    onClick={handleSutmit}
                />
            </form>

            <form onSubmit={handleSutmitFiltrar}>
                <input
                    type="text"
                    placeholder="Filtrar"
                    onChange={handleChangeFiltrar}
                    value={Filtro}
                />

                <input
                    type="submit"
                    className="btn"
                    value="Buscar"
                    onClick={handleSutmitFiltrar}
                />
            </form>

        </>
        



    );
}