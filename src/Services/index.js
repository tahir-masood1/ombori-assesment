/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;
function apiUrl(url, _method = '') {
  return API_BASE_URL + url;
}

function jsonToUrlEncode(json) {
  if (Object.keys(json).length === 0) {
    return '';
  }
  return (
    `?${Object.keys(json)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`)
      .join('&')}`
  );
}

export async function doFetch(method = 'GET', url, methodOptions = {}) {
  const options = {
    ...methodOptions,
    method,
    headers: {
      ...methodOptions.headers,
    },
  };

  // eslint-disable-next-line no-use-before-define
  return filterResponseOrError(url, options, method);
}
function filterResponseOrError(url, options, method) {
  let response;
  // eslint-disable-next-line no-async-promise-executor
  const request = new Promise(async (resolve, reject) => {
    try {
      response = await fetch(apiUrl(url, method), options);
      // if (response && response.status) {
      //   console.log("filterResponseOrError -> response", response.status);
      //   // const res = await response.json()
      //   // reject(res);
      // }

      if (response.status === 500) {
        // ErrorHandler.handleError(response.status, null);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          error: 'Something Went Wrong',
          statusCode: response.status,
        });
      } else if (response.status === 401 || response.status === 404) {
        const json = await response.json();
        // console.log('404', json)
        resolve(json);
      } else if (response.status === 412 || response.status === 400) {
        const resp = await response.json();
        resolve(resp);
      } else if (
        response.status >= 400
        && response.status !== 401
        && response.status !== 500
      ) {
        const json = await response.json();
        // ErrorHandler.handleError(response.status, json.Body);
        reject(json.body);
      } else {
        const resp = await response.json();
        resolve(resp);
      }
    } catch (error) {
      resolve(response && response.status);
    }
  }).catch((e) => {
    // console.log('err :', e.code);
    if (e.code === 'TimeoutError') {
      console.log('Session expired, try again');
      // dispatch(getCredentials(localStorage.getItem('authToken')))
      window.location.reload();
    }
    return {
      error: 'connection error',
    };
  });
  return request;
}

export function post(url, json, headers) {
  const options = {
    body: JSON.stringify(json),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    },
  };
  return doFetch('POST', url, options);
}

export function get(url, json = {}, headers = {}) {
  return doFetch('GET', url + jsonToUrlEncode(json), {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}
