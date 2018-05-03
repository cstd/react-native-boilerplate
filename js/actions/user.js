
import RNExitApp from 'react-native-exit-app';

import { postLogin, fetchVersion } from './services';
import { resetRoute } from './nav';
import { setAuthStatus } from './status';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_UPDATE_STATUS = 'SET_UPDATE_STATUS';
export const RESET_STATE = 'RESET_STATE';

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setUpdateStatus(updateStatus) {
  return {
    type: SET_UPDATE_STATUS,
    updateStatus,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

export function checkUpdate() {
  return async (dispatch, getState) => {
    const response = await fetchVersion();
    if (response.status === 200) {
      dispatch(setUpdateStatus(response.updateStatus));
    }
  };
}

export function login(username, password) {
  return async (dispatch, getState) => {
    dispatch(setAuthStatus('loading'));
    
    const response = await postLogin(username, password);
    
    if (response.status === 200) {
      dispatch(setToken(response.token));
      dispatch(setProfile(response.profile));
      dispatch(setAuthStatus('completed'));
      dispatch(resetRoute('home_page'));
    } else {
      dispatch(setAuthStatus('failed', response.statusText));
    }
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(resetState());
    setTimeout(() => RNExitApp.exitApp(), 500);
  }
}
