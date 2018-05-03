
import { fetchProducts } from './services';
import { setGetProductsStatus } from './status';

export const SET_PRODUCTS = 'SET_PRODUCTS';


export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

export function getProducts() {
  return async (dispatch, getState) => {
    dispatch(setGetProductsStatus('loading'));
    
    const { token } = getState().user;
    const response = await fetchProducts(token);
    
    if (response.status === 200) {
      dispatch(setProducts(response.products));
      dispatch(setGetProductsStatus('completed'));
    } else {
      dispatch(setGetProductsStatus('failed', response.statusText));
    }
  };
}