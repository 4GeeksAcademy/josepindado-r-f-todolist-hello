import React, {useState, useEffect} from "react";

const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);

//--------------------- [] => useEffect se ejecuta una vez --------------------
	useEffect(() => {
		getUsers();
	  }, []);
	
	const TaskChanger = (event) => {
		if (event.target.value !== "") {
			setNewTask(event.target.value)
		}
	}
	const addTask = (event) => {
		if (event.target.value !== "") {
			if (event.key == "Enter") {
				addTodo(newTask);
				setNewTask("")
				getTodos();
			}	
		}
	}
	const deteleTask = (event, id) => {
		deleteTodo(id);

	}

//---------------------GET / RECUPERAR USUARIOS--------------------
	const getUsers = () =>{
				fetch('https://playground.4geeks.com/todo/users?offset=0&limit=100', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  return resp.json(); 
		  })
		  .then(data => {
			const users = data.users; 
			users.find((user) => {return user.name === "josepindado"}) 
				? getTodos()
				: createUser()
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

//---------------------POST / AÑADIR USUARIO--------------------
	const createUser = async () => {
		await fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "POST",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(resp.ok); 
			   return resp; 
		  })
		  .then(data => {
			  console.log(data); 
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

//---------------------GET / RECUPERAR TAREAS--------------------
	const getTodos = async () => {
		await fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			return resp.json(); 
		  })
		  .then(data => {
			console.log(data); 
			data.todos.length === 0 
				? setTasks([{label: "Añadir tareas"}])
				: setTasks(data.todos)			
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}
//---------------------POST / AÑADIR TAREAS--------------------
	const addTodo = async (task) => {
		await fetch('https://playground.4geeks.com/todo/todos/josepindado', {
			method: "POST",
			body: JSON.stringify({
				label: task,
				is_done: false
			}),
			headers: {
			"Content-Type": "application/json",
			"accept": "application/json"
			}
		})
		.then(resp => {
			return resp; 
		})
		.then(data => {
			console.log(data); 
			getTodos();
		})
		.catch(error => {
			console.log(error);
		});
	}

//---------------------DELETE / BORRAR TAREA--------------------
	const deleteTodo = (idTask) =>{
		console.log(`idTask: ${idTask}`);
		fetch('https://playground.4geeks.com/todo/todos/${idTask}' + idTask, {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			return resp;
		}).then(data => {
			console.log(data);
			getTodos();
		}).catch (error => {
			console.log(error);
		})
	}

//---------------------DELETE / BORRAR TAREAS--------------------
	const deleteAllTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			return resp;
		}).catch (error => {
			console.log(error);
		})
	}

	return (
		<div className="container mt-3">
			<h1 className="todo-header text-center">ToDo List React & Fetch</h1>
			<input className="form-control" type="text" onChange={TaskChanger} onKeyDown={addTask} value={newTask} placeholder="Añadir una tarea"/>
			<ul className="list-group">
				{tasks.map((task, index) => {
					return <li key={index} id={task.id} className="list-group-item">{task.label}<button type="button" class="btn btn-danger ms-3" onClick={(event)=>{deteleTask(event,task.id)}}><i className="fa fa-trash"></i></button></li>
				})}
				<li className="list-group-item paper"><span className="">{tasks.length} Items añadidos</span></li>
	  		</ul>
			<div className="text-center">
				<div className="btn btn-danger mt-4" onClick={deleteAllTasks}>Borrar todo</div>
			</div>
		</div>

	);
};

export default Home;