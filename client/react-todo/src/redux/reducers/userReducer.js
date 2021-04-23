import { ADD_USER } from "../types/userType";

const userReducer = (state={}, action) => {
 
    switch (action.type) {
      case ADD_USER:
        
        return {
          ...state, 
         ... action.payload.user
        }
    
      default:
        return state;
    }

}

export default userReducer;


