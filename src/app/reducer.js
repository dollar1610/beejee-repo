import { TASK_LIST, IS_ADMIN, ACTIVE_PAGE } from './constants';

const initialState = {
  taskList: [],
  isAdmin: false,
  activePage: 1,
}

function appReducer(state=initialState, action) {
  switch(action.type) {
    case TASK_LIST:
      return {...state, taskList: action.payload};
    case IS_ADMIN:
      return {...state, isAdmin: action.payload};
    case ACTIVE_PAGE:
      return {...state, activePage: action.payload};
    default:
     return state;
  }
}

export default appReducer;
