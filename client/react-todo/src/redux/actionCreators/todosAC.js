import { ADD_TODO, CHANGE_STATUS, CHANGE_STATUS_SAGA, DELETE_TODO, EDIT_FORM, EDIT_TODO, LOAD_TODOS } from "../types/todoTypes";

export const loadTodos = () => (dispatch) => {
  console.log('load posts====>', )
   return fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
    .then(todosFromServer => dispatch(loadTodosServer(todosFromServer)))
}


export const loadTodosServer = (allTodos) => {
  return {
    type: LOAD_TODOS,
    payload: allTodos
  };
}

export const AddTodoFromBack = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo
  };
}

export const addTodo = (text) => (dispatch) => {

  fetch('http://localhost:3000/api/v1/todos', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(todoFromServer => dispatch(AddTodoFromBack(todoFromServer)))

}

export const editTodo = (id, text) => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      text
    }
  };
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id
  };
}

export const changeStatus = (id) => {
  return {
    type: CHANGE_STATUS,
    payload: id
  };
}

export const changeStatusSaga = (id) => {
  return {
    type: CHANGE_STATUS_SAGA,
    payload: id
  };
}


export const editForm = (id) => {
  return {
    type: EDIT_FORM,
    payload: id
  };
}


