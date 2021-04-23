import { createContext, useCallback, useState, useContext, useEffect } from 'react';

const todosContext = createContext()

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editTodoForm, setEditTodoForm] = useState(false)
  // const [editInput, setEditInput] = useState(input)
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/todos')
      .then(response => response.json())
      .then(todosFromServer => setTodos(todosFromServer))
  }, [])

  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  const addTodoHandler = useCallback((text) => {
    console.log('ADD');
    fetch('http://localhost:3000/api/v1/todos', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(todoFromServer => setTodos(prev => [...prev, todoFromServer]))
  }, [])

  const submitHandler = (e) => {
    console.log('SUBMIT===>');
    e.preventDefault()
    if (input.trim()) {
      addTodoHandler(input.trim())
      setInput("")
    }
  }
  const deleteHandler = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const handlerStatus = (id) => {
    fetch('http://localhost:3000/api/v1/todos', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(updatedTodoFromServer => setTodos(prev => prev.map(todo => {
        if (todo.id === id) {
          return updatedTodoFromServer
        }
        console.log(updatedTodoFromServer);
        return todo
      }))
      )
  }
  const editHandler = (id) => {
    let newTodos = todos.map(el => {
      if (el.id === id) {
        el.isEdited = !el.isEdited;
      }
      return el
    });
    setTodos(newTodos)
    // if (todos.id)
      // setEditTodoForm(!editTodoForm)
  }

  // const sendEditInput = (id,newTextForTodo) => {
  //   // fetch ...... body: {id: , newInput:""},

  //   if (response.status === succes) {
  //     const newTodos = todos.map(el => {
  //       if (el.id === id) {
  //         el.text = input
  //       }
  //       return el
  //     })
  //   }
  // }

  // const handlerEditInput = (e) => {
  //   console.log(e.target.value);
  //   setEditInput(e.target.value)
  // }
  return (
    <todosContext.Provider value={{
      addTodoHandler,
      input,
      todos,
      inputHandler,
      submitHandler,
      deleteHandler,
      handlerStatus,
      editHandler,
      // sendEditInput,
      editTodoForm,
      // handlerEditInput,
      // editInput
    }}>
      {children}
    </todosContext.Provider>
  )
}

export default TodosContextProvider
// const useTodosContext = () => useContext(todosContext)
export {
  todosContext,
}
