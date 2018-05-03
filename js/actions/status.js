
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
export const SET_GET_PRODUCTS_STATUS = 'SET_GET_PRODUCTS_STATUS';

export function setAuthStatus(status, error='') {
  return {
    type: SET_AUTH_STATUS,
    status,
    error,
  };
}

export function setGetProductsStatus(status, error='') {
  return {
    type: SET_GET_PRODUCTS_STATUS,
    status,
    error,
  };
}
