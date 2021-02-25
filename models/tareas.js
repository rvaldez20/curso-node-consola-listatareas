require('colors');

/**
 * _listado
 *    { uuid-00000-000-000000-00000 : {id:12, desc:'xxx', completadoen:fecha} }
 * 
 */

 const Tarea = require('./tarea');

class Tareas {

   _listado = {}

   get listadoArr(){

      const listado = [];
      Object.keys(this._listado).forEach( key => {
         const tarea = this._listado[key];
         listado.push(tarea);
      })

      return listado;
   }

   constructor() {
      this._listado = {};
   }

   /* +++++++++ METODS ++++++++++ */

   borrarTarea( id = '' ) {

      if( this._listado[id] ){
         delete this._listado[id];
      }

   }

   cargarTareasFromArray ( tareas = [] ) {
     tareas.forEach( tarea =>{
         this._listado[tarea.id] = tarea;
     });
   }


   crearTareas( desc = '' ) {
      const tarea = new Tarea( desc );
      this._listado[tarea.id] = tarea;
   }


   listadoCompleto( tareas ) {         
      let aNumber, status, tareaFormateada = '';
      console.log();

      tareas.map( (tarea, index) => {
         aNumber = (index+1).toString();      
         tarea.completadoEn === null ? status = 'Pendiente'.brightRed : status = 'Completada'.brightGreen;
         // console.log(number);
         tareaFormateada += `${aNumber.brightGreen+'.'.brightGreen} ${tarea.desc}  ::  ${status}\n`;
      });

      console.log(tareaFormateada);
   }


   listarPendientesCompletadas( tareas, completadas = true ){

      let aNumber, status, contador;
      console.log();

      if (completadas) {
         // Se muestran solo las copletadas
         contador = 1;
         tareas.map( (tarea) => {
            if (tarea.completadoEn !== null) {
               aNumber = (contador).toString();                     
               
               console.log(`${aNumber.brightGreen+'.'.brightGreen} ${tarea.desc}  ::  ${tarea.completadoEn.brightGreen}`);     
               contador++;
            }            
         });           
      } else {
         // Se muestran solo las pendientes
         contador = 1;
         tareas.map( (tarea, index) => {
            if (tarea.completadoEn === null) {
               aNumber = (contador).toString();      
               tarea.completadoEn === null ? status = 'Pendiente'.brightRed : status = 'Completada'.brightGreen;
               
               console.log(`${aNumber.brightGreen+'.'.brightGreen} ${tarea.desc}  ::  ${status}`);     
               contador++;
            }
         }); 
      }
   }

   toggleCompletadas ( ids = [] ) {

      ids.forEach( id => {

         // primero extraemos la tarea
         const tarea = this._listado[id];
         if ( !tarea.completadoEn ) {
            tarea.completadoEn = new Date().toISOString();
         }
      })

      this.listadoArr.forEach( tarea => {

         if( !ids.includes(tarea.id) ) {
            this._listado[tarea.id].completadoEn = null;
            // Tabien se puede ahcer de esta forma separando
            // const tarea = this._listado[tarea.id];
            // tarea.completadoEn = null;

         }
      });

   }

}

module.exports = Tareas;