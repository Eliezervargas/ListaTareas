EN la carpeta "ListaTareas" se encuentra la Api y el Front en React
Pasos:
1.-Ubicar el archivo ".\ListaTareasListaTareas.sln" abrir la solucion con visual studio
2.-Modificar el archivo ".\ListaTareas\ApiTareas\appsettings" Modificar el string de conexion "FitGroupConection" con los datos del servidor SQL
3.-Correr la api si la conexion es valida se creara la base de datos con la tabla tarea y mostrara con "swagger" la documentacion de la api
(esta Api se ejecutara en https://localhost:7115 )
4.Ubicarse en la carpeta "\ListaTareas\listatareafitgroup" abrir un cmd y ejecutar el comando "code ." este abrira el codigo front a traves del visual studio code.
5. Cerrar el cmd y ejecutar con la terminal el comando "npm start" para ejecutar la app en react que mostrara
un listado de tareas donde se podra agregar tarea,eliminar y editar tarea,modificar el estado solo seleccionando la tarea
 + se le agrego las opciones de ver todas las tareas, completadas y no completadas
 + Se le agrego la opcion de filtrar por texto
(esta app se ejecutara en http://localhost:3000)
