const inquire = require('inquirer');
require('colors');

// configpreguntas?
const preguntas = [{
   type: 'list',
   name: 'opcion',
   message: 'Qué desea hacer?',
   choices: [
      {
         value: '1',
         name: `${'1.'.brightGreen} Crear tarea`
      },
      {
         value: '2',
         name: `${'2.'.brightGreen} Listar tareas`
      },
      {
         value: '3',
         name: `${'3.'.brightGreen} Listar tareas completadas`
      },
      {
         value: '4',
         name: `${'4.'.brightGreen} Listar tareas pendientes`
      },
      {
         value: '5',
         name: `${'5.'.brightGreen} Completar tarea(s)`
      },
      {
         value: '6',
         name: `${'6.'.brightGreen} Borrar tarea`
      },
      {
         value: '0',
         name: `${'0.'.brightGreen} Salir`
      }
   ]
}];

const PreguntaInput = [
   {
      type: 'input',
      name: 'enter',
      message: `Presiona ${ 'ENTER'.green } para continuar`,
   }
]

// funcion para mostrar el menu interactivo
const inquirerMenu = async() => {
   console.clear();
   console.log('============================='.green);
   console.log('   Seleccione una opción'.brightWhite);
   console.log('=============================\n'.green);

   const { opcion } = await inquire.prompt(preguntas);
   return opcion;
}

// funcion que permite pausar cuando seleccionamos una opcion
const pausa = async() => {
   await inquire.prompt(PreguntaInput);
}

// funcion para
const leerInput = async ( message ) => {

   const question = [
      {
         type: 'input',
         name: 'desc',
         message,
         validate( value ) {
            if(value.length === 0) {
               return 'Por favor ingrese un valor';
            }
            return true;
         }
      }  
   ];

   const { desc } = await inquire.prompt(question);
   return desc;
}


const listadoTareasBorrar = async (tareas) => {

   const choices = tareas.map( (tarea, i) => {

      const idx = `${i + 1}.`.brightGreen
      // const idx = i + 1;

      return {
         value: tarea.id,
         name: `${ idx } ${tarea.desc}`         
      }
   });

   choices.unshift({
      value: '0',
      name: '0.'.brightGreen + ' Cancelar'
   });

   // console.log(choices )
   
   const preguntas = [
      {
         type: 'list',
         name: 'id',
         message: 'Borrar',
         choices
      }
   ]
   const { id } = await inquire.prompt(preguntas);

   return id;
}


const confirmar = async (message) => {

   const question =  [{
      type: 'confirm',
      name: 'ok',
      message
   }];

   const { ok } = await inquire.prompt(question);
   return ok;
}

// exportamos las funciones
module.exports = {
   inquirerMenu,
   pausa,
   leerInput,
   listadoTareasBorrar,
   confirmar
}

