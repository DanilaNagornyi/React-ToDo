import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { todosContext } from "../../Contexts/todoContexts";
import { sendEditInput } from '../../Contexts/todoContexts'
import { editTodo } from "../../redux/actionCreators/todosAC";
const Edit = ({ editHandler, text, id }) => {
  const [editInput, setEditInput] = useState(text)

  const dispatch = useDispatch()

  const handlerEditInput = (e) => {
    setEditInput(e.target.value)
  }
  const editTodoHandler = (id, text) => {
    fetch('http://localhost:3000/api/v1/todos/changeEdit', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, text })
    })
      .then(response => response.status === 200 ? dispatch(editTodo(id, text)) : null)


  }
  const editSubmitHandler = (e) => {
    e.preventDefault();
    if (editInput.trim()) {
      editTodoHandler(id, editInput.trim())
      setEditInput("")
      editHandler(id)
    }
  }
  return (
    <>
      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div className="col">
              <input onChange={handlerEditInput} value={editInput} className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." />
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <button onClick={editSubmitHandler} type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 mx-4 border-black-25 border-bottom"></div>
    </>
  );
}

export default Edit;
