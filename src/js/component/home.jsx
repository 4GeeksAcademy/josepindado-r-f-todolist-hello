import React, {useState, useEffect}from "react";

//create your first component
const Home = () => {

	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([{label: "No tasks here, add tasks"}]);

	
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
		console.log("-----------getUsers----------------")
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
		console.log("-----------createUser----------------")
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
		console.log("-----------getTodos----------------")
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
				? setTasks([{label: "No tasks here, add tasks"}])
				: setTasks(data.todos)			
		  })
		  .catch(error => {
			  console.log(error);
		  });
	}

	const addTodo = async (task) => {
		console.log("-----------addTodo----------------")
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
		console.log("-----------deleteTodo----------------")
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
		console.log("-----------deleteAllTasks----------------")
		fetch('https://playground.4geeks.com/todo/users/josepindado', {
			method: "DELETE",
			headers: {
				"accept": "application/json"
				}
		}).then(resp => {
			console.log(`resp.status:` , resp.status, `resp.statusText:`, resp.statusText); 
			return resp;
		}).then(data => {
			console.log(data);
			setTasks([{label: "No tasks here, add tasks"}])
			createUser()
		}).catch (error => {
			console.log(error);
		})
	}

	return (
		<div className="container mt-5">
			<h1 className="todo-header text-center">Todos</h1>
			<input className="form-control" type="text" onChange={TaskChanger} onKeyDown={addTask} value={newTask} placeholder="Add to do here"/>
			<ul className="list-group">
				{tasks.map((task, index) => {
					return <li key={index} id={task.id} className="list-group-item"><span onClick={(e)=>{deteleTask(e,task.id)}}><i className="fa fa-trash"></i></span>{task.label}</li>
				})}
				<li className="list-group-item paper"><small className="">{tasks.length} item left</small></li>
	  		</ul>
			<div className="text-center">
				<div className="btn btn-danger mt-4" onClick={deleteAllTasks}>Delete all</div>
			</div>
		</div>

	);
};

export default Home;