
import { REHYDRATE } from 'redux-persist';
import { 
  SET_TOKEN,
  SET_PROFILE,
  SET_UPDATE_STATUS,
  RESET_STATE,
} from '../actions/user';


const initialState = {
  token: '',
  profile: {},
  updateStatus: {
    required: false,
    source: '',
    version: '1.0.0',
    build: 0
  },
};

export default function (state = initialState, action) {
  if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: action.token,
    };
  }

  if (action.type === SET_PROFILE) {
    return {
      ...state,
      profile: action.profile,
    };
  }

  if (action.type === SET_UPDATE_STATUS) {
    return {
      ...state,
      updateStatus: action.updateStatus,
    };
  }
  
  if (action.type === RESET_STATE) {
    return initialState;
  }

  if (action.type === REHYDRATE) {
    const saved = action.payload.user || state;
    return {
      ...state,
      token: saved.token,
      profile: saved.profile,
    };
  }

  return state;
}
