
import { RESET_STATE } from '../actions/user';
import { 
  SET_AUTH_STATUS,
  SET_GET_PRODUCTS_STATUS,
} from '../actions/status';


const initialState = {
  authStatus: {
    status: 'completed',
    content: ''
  },
  getProductsStatus: {
    status: 'completed',
    content: ''
  }
};

export default function (state = initialState, action) {
  if (action.type === SET_AUTH_STATUS) {
    return {
      ...state,
      authStatus: {
        status: action.status,
        error: action.error,
      },
    };
  }
  
  if (action.type === SET_GET_PRODUCTS_STATUS) {
    return {
      ...state,
      getProductsStatus: {
        status: action.status,
        error: action.error,
      },
    };
  }
  
  if (action.type === RESET_STATE) {
    return initialState;
  }

  return state;
}
