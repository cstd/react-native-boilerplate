
import { Platform } from 'react-native';

import { API_URL, UNKNOWN_ERROR, WRONG_USERNAME_PASSWORD_ERROR } from '../constants';
import { normalizeVersion, normalizeProfile, normalizeProduct } from '../utils/normalizers';
import request from '../utils/request';


export function fetchVersion() {
  console.log("fetchVersion");
  return request(`${API_URL}/?${Platform.OS === 'android' ? "android_version" : "ios_version"}`)
    .then(response => {
      if (response.status === 200) {
        console.log("fetchVersion data", response.data);
        response = {
          ...response,
          updateStatus: normalizeVersion(response.data)
        };
      }

      return response;
    });
}

export function postLogin(username, password) {
  console.log("postLogin");
  return request(`${API_URL}/?login`, 
    // {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username, 
    //     password,
    //   }),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // }
  )
    .then(response => {
      if (response.status === 200) {
        console.log("postLogin data", response.data);
        response = {
          ...response,
          token: response.data ? response.data.token : null,
          profile: response.data && response.data.profile ? 
                      normalizeProfile(response.data.profile) : null
        };
      }
      
      if ((response.status === 200 && (!response.token || !response.profile)) ||
          (response.status === 999 && response.statusText === UNKNOWN_ERROR) ||
          response.status === 403) {
            
        console.log("postLogin error", response.data);
        
        response = {
          status: 888,
          statusText: WRONG_USERNAME_PASSWORD_ERROR
        }
      }
      
      return response;
    });
}

export function fetchProducts(token) {
  console.log("getProducts");
  return request(`${API_URL}/?token=${token}`)
    .then(response => {
      if (response.status === 200) {
        console.log("getProducts data", response.data);
        response = {
          ...response,
          products: response.data && response.data.products ? 
                      response.data.products.map(product => normalizeProduct(product)) : []
        };
      }

      return response;
    });
}
