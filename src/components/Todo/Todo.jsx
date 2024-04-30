import React, { useState, useEffect } from 'react'
import "./Todo.css"
import todo_image from "../../assets/Todo_image.png";
import add_icon from "../../assets/Plus_icon.png";
import edit_icon from "../../assets/edit_icon.png";
import complete_icon from "../../assets/complete_icon.png";
import delete_icon from "../../assets/delete_icon.png";

const Todo = () => {

  // const [divElements, setDivElements] = useState([]);
  const [popOpen,setPopOpen] = useState(false);
  const [formData, setFormData] = useState({title: '', body: ''});
  // const [count,setCount] = useState(1);
  // const [isComplete, setIsComplete] = useState(false);

  const [todos, setTodos] = useState([]);
  const [idNo, setIdNo] = useState(1);

  const [selectedTodo, setSelectedTodo] = useState(null); 

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (event) => {
    setFormData({...formData,[event.target.name] : event.target.value});
  }

  // const handleAddDiv = () => {
  //   const newDiv = <div key={divElements.length + 1}>
  //     <div className="task-upper">
  //       <div className='task-title'>{formData.title}</div>
  //       <div className="task-title-img">
  //         <img src={complete_icon} className='features' alt="" />
  //         <img src={edit_icon} className='features' alt="" />
  //         <img src={delete_icon} className='features' alt="" />
  //       </div>
  //     </div>
  //     <div className="task-lower">
  //       <div className='task-description'>{formData.description}</div>
  //     </div>
  //   </div>
  //   setDivElements([...divElements,newDiv]);
  //   setPopOpen(false);
  //   setFormData({title:'', body:''})
  //   localStorage.setItem('divElements', JSON.stringify(divElements));
  // }
  const handleAddDiv = (e) => {
    setIdNo(idNo+1);
    e.preventDefault();
    const newTodo = {
      id: idNo,
      title: formData.title,
      description: formData.description,
      isComplete: false,
      tags: selectedTags,
    };
    // setTodos([...todos, newTodo]);
    // setTodos((prevTodos) => [...prevTodos, newTodo]);
    // todos.push(newTodo);

    const updatedTodos = [...todos]
    updatedTodos.push(newTodo);
    setTodos(updatedTodos)

    setPopOpen(false);
    setFormData({ title: '', description: '' });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    localStorage.setItem('IdNo',JSON.stringify(idNo));
    console.log("Added from handleAddDiv");
  };

  const handleDeleteTodo = (id) => {
    const reducedTodo = [...todos]
    reducedTodo.splice(id,1);
    localStorage.setItem('todos', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  // var count = 1;

  // const handleComplete = () => {
  //   count%2===1 ? setIsComplete(true) : setIsComplete(false);
  //   count = count + 1;
  //   console.log(count);
  // }

  const handleComplete = (id) => {
    setTodos((todos) => {
     const newTodo = todos.map((todo) => 
      todo.id === id 
        ? { ...todo, isComplete: !todo.isComplete } 
        : todo
    )
      localStorage.setItem('todos', JSON.stringify(newTodo));
      return newTodo;
    }
    );
  };

   const handleEditTodo = (todo) => {
    setSelectedTodo(todo); // Set the todo to be edited
    setPopOpen(true);
    setFormData({ title: todo.title, description: todo.description }); // Pre-populate form
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedTodo) return; // Handle potential errors

    const updatedTodos = [...todos].map((todo) =>
      todo.id === selectedTodo.id
        ? { ...todo, title: formData.title, description: formData.description }
        : todo
    );
    setTodos(updatedTodos);
    setPopOpen(false);
    setFormData({ title: '', description: '' });
    setSelectedTodo(null); // Clear selected todo after edit
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    console.log("Edited todo");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos([]);
    }

    const storedId = localStorage.getItem('IdNo');
    if (storedId) {
      setIdNo(JSON.parse(storedId)+1);
    }
  }, []);
  

  return (
    <div className='todo'>
      <div className="box">
        <div className="box-left">
          <div className="heading">
            Todo
          </div>
          <div className="color-palette">
            <div className="palette"><div className="colour-1 colour-circle"></div><div className="palette-value">Work</div></div>
            <div className="palette"><div className="colour-2 colour-circle"></div><div className="palette-value">Study</div></div>
            <div className="palette"><div className="colour-3 colour-circle"></div><div className="palette-value">Entertainment</div></div>
            <div className="palette"><div className="colour-4 colour-circle"></div><div className="palette-value">Family</div></div>
          </div>
          <div className="image">
            <img src={todo_image} alt="" />
          </div>
        </div>
        <div className="box-right">
          <div className="right-upper">
            <img src={add_icon} alt="" onClick={()=>{setPopOpen(true);
            /*setCount(count+1)*/}} />
            {(popOpen /*&& (count%2 === 0)*/) && (
              <div className="popup-box">
                <form onSubmit={selectedTodo ? handleSaveEdit : handleAddDiv} className='todo-form'>
                  <div className='component'>
                    <label htmlFor="title" className='label'>Title:</label>
                    <input className='input-title' type="text" value={formData.title} name='title' onChange={handleChange} required/>
                  </div>
                  <div className='component'>
                    <label htmlFor="description" className='label'>Description:</label>
                    <textarea className='input-description' value={formData.description} name='description' onChange={handleChange} required/>
                  </div>
                  <div className='component'>
                    <label htmlFor="tags" className='label'>Tags:</label>
                    <select multiple onChange={(e) => setSelectedTags([...e.target.options].filter(x => x.selected).map(x => x.value))} className='input-tags'>
                      <option value="Work">Work</option>
                      <option value="Study">Study</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  <div className='component'>
                    <button className='add-div-button' type='submit'>Add</button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="right-lower">
      <div className="grid-container">
        {todos.map((todo, index) => (
          <div key={todo.id} className='grid-item'>
            <div className="task-upper">
              <div className={todo.isComplete ? "strikethrough task-title" : "task-title"}>{todo.title}</div>
              <div className="task-title-img">
                <img src={complete_icon} onClick={()=>handleComplete(todo.id)} className='features' alt="" />
                <img src={edit_icon} onClick={() => handleEditTodo(todo)} className='features' alt="" />
                <img src={delete_icon} onClick={()=>handleDeleteTodo(index)} className='features' alt="" />
              </div>
            </div>
            <div className="task-lower">
              <div className={todo.isComplete ? "strikethrough task-description" : "task-description"} >{todo.description}</div>
              <div className="task-tags">
              {todo.tags && (
              <div className="task-tags">
                {todo.tags.map(tag => (
                <span key={tag} className="tag">{tag} &nbsp; </span>
                ))}
              </div>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default Todo