import { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeStatus,
  changeStatusSaga,
  deleteTodo,
  editForm,
  loadTodos,
} from '../../redux/actionCreators/todosAC';
// import loadTodos from '../../redux/thunks/loadTodosThunk'

import Edit from '../Edit/Edit';

const Todo = ({ text, id, isEdited, status, indx }) => {
  // const { deleteHandler, editHandler, editTodoForm, handlerStatus } = useContext(todosContext)
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handlerStatus = (id) => {
    dispatch(changeStatusSaga(id));
  };

  const deleteHandler = (id) => {
    console.log(id, 'ID DELETE');
    fetch('http://localhost:3000/api/v1/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((response) =>
      response.status === 200 ? dispatch(deleteTodo(id)) : null
    );
  };

  const editHandler = (id) => {
    dispatch(editForm(id));
  };

  return (
    <>
      <div className="row px-3 align-items-center todo-item rounded">
        <div className="col-auto m-1 p-0 d-flex align-items-center">
          <h2 className="m-0 p-0">
            {/* <i className="fa fa-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i> */}
            <i
              onClick={() => handlerStatus(id)}
              className={`fa ${
                status ? 'fa-check-square-o' : ' fa-square-o'
              } text-primary btn m-0 p-0`}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as todo"
            ></i>
          </h2>
        </div>
        <div className="col px-1 m-1 d-flex align-items-center">
          <input
            value={text}
            type="text"
            className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"
            readOnly
            title="Buy groceries for next week"
          />
          <input
            type="text"
            className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"
            defaultValue="Buy groceries for next week"
          />
        </div>
        {/* <div className="form-check">
          <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckDefault" />
                  Done
                </div> */}
        <div className="col-auto m-1 p-0 px-3 d-none"></div>
        <div className="col-auto m-1 p-0 todo-actions">
          <div className="row d-flex align-items-center justify-content-end">
            <h5 className="m-0 p-0 px-2">
              <i
                onClick={() => editHandler(id)}
                className="fa fa-pencil text-info btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Edit todo"
              ></i>
            </h5>
            {/* передаём айди в аргумент функции */}
            <h5 className="m-0 p-0 px-2">
              <i
                onClick={() => deleteHandler(id)}
                className="fa fa-trash-o text-danger btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Delete todo"
              ></i>
            </h5>
          </div>
          <div className="row todo-created-info">
            <div className="col-auto d-flex align-items-center pr-2">
              {/* <i className="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Created date"></i> */}
            </div>
          </div>
        </div>
      </div>
      {isEdited && (
        <Edit editHandler={editHandler} key={id} text={text} id={id} />
      )}
    </>

    // <li className="list-group-item d-flex align-items-center justify-content-between">
    //   <span className={status ? 'done' : ''}>
    //     {indx + 1}.&nbsp;{text}
    //   </span>
    // </li>
  );
};

export default Todo;
