require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const {mostrarMenu, pausa} = require('./helpers/mensajes');
const {
         inquirerMenu, 
         pausa,
         leerInput,
         listadoTareasBorrar,
         confirmar,
         mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


const main = async () => {

   let opt = '';
   const tareas = new Tareas();

   const tareasDB = leerDB();
  
   // cargar tareas
   if (tareasDB) { 
      tareas.cargarTareasFromArray( tareasDB );
   }





   do {

      // Imprimir el menu y guardamos en opt la ocpion seleccionada
      opt = await inquirerMenu();
      // console.log(opt)

      // Se programa en base a la opción seleccionada
      switch (opt) {
         case '1':
            /* +++++ Crear una tarea +++++ */
            // Obtenemos la descripcion y se guarda en la desc y creamos la tarea
            const desc = await leerInput('Descripcion: ');
            tareas.crearTareas(desc);
         break;
         case '2':
            /* +++++ Listar las tareas +++++ */            
            // console.log(tareas.listadoArr);
           
            tareas.listadoCompleto(tareas.listadoArr);
                  
         break;
         case '3':
            tareas.listarPendientesCompletadas(tareas.listadoArr,true);
         break;
         case '4':
            tareas.listarPendientesCompletadas(tareas.listadoArr,false);
         break;
         case '5': // Cambiar Completado | Pendiente
            const ids = await mostrarListadoCheckList(tareas.listadoArr);
            // console.log(ids);
            tareas.toggleCompletadas(ids);
         break;
         case '6': // borrar tareas
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if (id !== '0') {
               const confirmarBorrado = await confirmar('¿Estás seguro?')
               if(confirmarBorrado) {
                  tareas.borrarTarea(id);
                  console.log('Tarea Borrada')
               }
               // console.log({ confirmarBorrado });
            }
         break;
      }


      guardarDB(tareas.listadoArr);
      
      
      console.log('\n')
      if (opt !== '0') {
         await pausa(); 
      }
      
   } while ( opt !== '0' );
}

main();





/* Solo para probar las clases */
// const tareas = new Tareas();
// const tarea = new Tarea('Comprar curso de Node js en Udemy');
// tareas._listado[tarea.id] = tarea;
// console.log(tareas);
// console.log(tarea)