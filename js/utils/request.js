
import { SERVER_ERROR, NETWORK_ERROR, UNKNOWN_ERROR } from '../constants';

async function parseJSON(response) {
  const data = await response.json();
  
  if (response.status !== 200) {
    console.log("request response.status !== 200", response);
  }
  
  return {
    data,
    status: response.status,
    statusText: response.statusText || response._bodyText
  };
}

export default function request(url, options) {
  console.log("request url", url);
  return fetch(url, options)
    .then(parseJSON)
    .catch(error => {
      console.log("request error", error);
      let errorContent = error.toString();
      if (error.name === 'SyntaxError') {
        errorContent = SERVER_ERROR;
      } else if (error.name === 'TypeError' && error.message === 'Network request failed') {
        errorContent = NETWORK_ERROR;
      } else {
        errorContent = UNKNOWN_ERROR;
      }
      return {
        status: 999,
        statusText: errorContent,
        error: {
          name: error.name,
          message: error.message
        }
      }
    });
}
