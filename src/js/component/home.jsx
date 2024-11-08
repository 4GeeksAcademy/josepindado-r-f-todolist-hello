import React, {useState, useEffect}from "react";

const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);

	
	useEffect(() => {
		getUsers();
	  }, []);
	
	const TaskChanger = (event) => {
		if (event.target.value !== "") {setNewTask(event.target.value)}
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

	const getUsers = () =>{
				fetch('https://playground.4geeks.com/todo/users?offset=0&limit=100', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
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

	const createUser = async () => {
		await fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "POST",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
			  console.log(resp.ok); 
			  console.log(resp.status); 
			  console.log(resp.text());
			  return resp; 
		  })
		  .then(data => {
			  console.log("data");
			  console.log(data); 
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	const getTodos = async () => {
		await fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "GET",
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then(resp => {
			  console.log(`resp:` , resp); 
			  console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
			  return resp.json(); 
		  })
		  .then(data => {
			console.log(`data:` , data); 
			data.todos.length === 0 
				? setTasks([{label: "Añadir tareas"}])
				: setTasks(data.todos)			
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

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
			console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
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

	const deleteTodo = (idTask) =>{
		console.log(`idTask: ${idTask}`);
		fetch('https://playground.4geeks.com/todo/todos/' + idTask, {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
			return resp;
		}).then(data => {
			console.log(data);
			getTodos();
		}).catch (error => {
			console.log(error);
		})
	}

	const deleteAllTasks = () => {
		fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
			return resp;
		}).catch (error => {
			console.log(error);
		})
	}

	return (
		<div className="container mt-5">
			<h1 className="todo-header text-center">ToDo List React & Fetch</h1>
			<input className="form-control" type="text" onChange={TaskChanger} onKeyDown={addTask} value={newTask} placeholder="Añadir una tarea"/>
			<ul className="list-group">
				{tasks.map((task, index) => {
					return <li key={index} id={task.id} className="list-group-item"><span onClick={(e)=>{deteleTask(e,task.id)}}><i className="fa fa-trash"></i></span>{task.label}</li>
				})}
				<li className="list-group-item paper"><small className="">{tasks.length} Items añadidos</small></li>
	  		</ul>
			<div className="text-center">
				<div className="btn btn-danger mt-4" onClick={deleteAllTasks}>Borrar todo</div>
			</div>
		</div>

	);
};

export default Home;