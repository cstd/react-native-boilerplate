
import { REHYDRATE } from 'redux-persist/constants';
import { RESET_STATE } from '../actions/user';
import { 
  SET_PRODUCTS,
} from '../actions/app';


const initialState = {
  products: [],
};

export default function (state = initialState, action) {

  if (action.type === SET_PRODUCTS) {
    return {
      ...state,
      products: action.products,
    };
  }
  
  if (action.type === RESET_STATE) {
    return initialState;
  }

  if (action.type === REHYDRATE) {
    const saved = action.payload.app || state;
    return {
      ...state,
      // products: saved.products,
    };
  }

  return state;
}
