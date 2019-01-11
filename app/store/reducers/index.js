import { combineReducers } from 'redux-immutable';
import { articles } from './module/articles';
import { home } from './module/home';

const rootReducer = combineReducers({
  /* your reducers */
  articles,
  home,
});

export default rootReducer;
