import { ADD_TODO, CHANGE_STATUS, DELETE_TODO, EDIT_FORM, EDIT_TODO, LOAD_TODOS } from "../types/todoTypes";

const todosReducer = (state = [], action) => {
  switch (action.type) {

    case LOAD_TODOS:
      return action.payload
    

    case ADD_TODO:
      return [
        ...state,
        action.payload
      ];

    case CHANGE_STATUS:
      return state.map(el => {
        if (el.id === action.payload) {
          return {
            ...el,
            status: !el.status
          }
        }
        return el
      });

    case EDIT_FORM:
      return state.map(el => {
        if (el.id === action.payload) {
          return {
            ...el,
            isEdited: !el.isEdited,
          }
        }
        return el
      });

    case DELETE_TODO:
      return state.filter(el => el.id !== action.payload)

    case EDIT_TODO:
      return state.map(el => {
        if (el.id === action.payload.id) {
          el.text = action.payload.text
        }
        return el
      })

    default:
      return state;
  }
}

export default todosReducer;
