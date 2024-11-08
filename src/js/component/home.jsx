import React, { useEffect, useState } from "react";

import Carta from "./Carta";
import Cabecera from "./Cabecera";


//create your first component
const Home = () => {
  //Hacemos que la api cree un usuario nada más carge la web
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/josepindado", {
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST"
    })
  }, []);
  const datos = () =>{
    fetch("https://playground.4geeks.com/todo/users/josepindado")
      .then(response => response.json())
      .then(response => setTask(response.todos))
  } 
  useEffect(()=>{
    datos()
  }, []);

  //Creamos una variable vacía para que almacene los datos del input
  const [tarea, setTarea] = useState("");

  // Creamos un array vacio para que almacene los datos que le llegan de la variable de tarea
  const [task, setTask] = useState([{}]);

  //Creamos la funcion para que el programa lea el valor que hay en el input y lo almacene en tarea
  const handleChange = (event) => {
    setTarea(event.target.value);
  };


  //Creamos la funcion para que añada un elemento nuevo al array task
  const nuevaTarea = () => {
    //Validamos que si no hay informacion en la variable tarea no pueda añadir nada al array de task
    if (tarea == "") {
      alert("Debes crear una tarea");
    } else {
      //Creamos un objeto para almacenar la tarea
      const newTask = {
        label: tarea,
        is_done: false
      }
      //hacemos el fetch para que cree la tarea
      fetch("https://playground.4geeks.com/todo/todos/josepindado", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask)
      });
      datos();
      setTarea();
    }
  };


  return (
    <div>
      <Cabecera input={handleChange} nuevaTarea={nuevaTarea} />
      <div className="row tareas">
        {task.length > 0 ? (
          //Mapeamos el array que tenemos en cada momento
          task.map((element) => {
            //Creamos la funcion que elimina la carta seleccionada
            const eliminarTarea = () => {
              fetch(`https://playground.4geeks.com/todo/todos/${element.id}`, {
                method: "DELETE"
              })
              datos();
            };
            //Retornamos una carta por cada elemento del array
            return (
              <>
                <Carta task={element.label} eliminarTarea={eliminarTarea} />
              </>
            );
          })
        ) : (
          <div className="tareasPendientes">
            <p>No hay tareas, añadir tareas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;