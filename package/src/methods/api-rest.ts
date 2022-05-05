import axios from 'axios';
import qmObj from './obj';

type dbMethod = 'delete' | 'get' | 'post' | 'put';

function checkStatus(status: number) {
  if (status === 404) return false;
  return true;
}


function responsePascalToCamelCase(data: any) {
  function renameObjKey(obj: object, oldKey: string, newKey: string) {
    // @ts-ignore
    if (typeof obj[oldKey] === 'undefined') return;
    if (oldKey === newKey) return;
    // @ts-ignore
    Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
    // @ts-ignore
    delete obj[oldKey];
  }
  
  function strPascalToCamelCase(str: string) {
    if (str === 'ID') return 'id';
    let res = str.charAt(0).toLowerCase() + str.slice(1);
    const lastTwoChars = res.slice(res.length - 2);
    if (lastTwoChars === 'ID'){
      res = `${res.slice(0, res.length - 2)}Id`;
    }
    return res;
  }

  function objPascalToCamelCase(obj: object) {
    for (let [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value) {
        objPascalToCamelCase(value);
      }
      renameObjKey(obj, key, strPascalToCamelCase(key));
    }
  }

  if (!data) return data;

  if (typeof data === 'object') {
    if (qmObj.isArray(data)) {
      // array
      data.forEach((dataItem: object) => {
        objPascalToCamelCase(dataItem);
      });
    } else {
      // object
      objPascalToCamelCase(data);
    }
  }
  return data;
}

function callAxios(method: dbMethod, url: string, params: object) {
  if (method === 'get') return axios.get(url, { params: params});
  if (method === 'put') return axios.put(url, params);
  if (method === 'post') return axios.post(url, params);
  if (method === 'delete') return axios.delete(url);
  return axios.get(url, { params: params });
}

export default {
  connectApi(
    method: dbMethod,
    serverUrl: string,
    url: string,
    params: object,
    success?: (res: any, count?: number) => void,
    error?: (res: any) => void,
  ) {
    callAxios(method, `${serverUrl}${url}`, params)
    .then(res => {
      if (!checkStatus(res.status)) {
        console.log('EL STATUS ESTÁ MAL');
      }
      return res;
    })
    .then((res) => {
      const resData = responsePascalToCamelCase(res.data.data);
      if (qmObj.isArray(resData)) {
        const count = +res.data.count | 0;
        if (success) success(resData, count);
        return;
      }
      if (success) success(resData);
    })
    .catch((err) => {
      console.log('Error al conectar DB', err);
      if (error) error(err);
    });
  },
}