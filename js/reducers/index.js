
import { combineReducers } from 'redux';

import nav from './nav';
import user from './user';
import status from './status';
import app from './app';

export default combineReducers({

  nav,
  user,
  status,
  app,

});
