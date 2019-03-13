import { combineReducers } from 'redux-immutable';
import appReducer from './app/reducer';

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
