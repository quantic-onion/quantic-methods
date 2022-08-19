import axios from 'axios';
import qmObj from './obj';

type DbMethod = 'delete' | 'get' | 'post' | 'put';

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

function callAxios(method: DbMethod, url: string, params?: object) {
  if (method === 'get') return axios.get(url, { params: params});
  if (method === 'put') return axios.put(url, params);
  if (method === 'post') return axios.post(url, params);
  if (method === 'delete') return axios.delete(url);
  return axios.get(url, { params: params });
}

export default {
  connectApi(
    method: DbMethod,
    url: string,
    params?: object,
    successCb?: (res: any) => void,
    errorCb?: (res: any) => void,
  ) {
    callAxios(method, url, params).then(successCb).catch(errorCb);
  },
  connectDatabase(
    method: DbMethod,
    serverUrl: string,
    url: string,
    params?: object,
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
  connectDatabaseAndGetLenght(
    method: DbMethod,
    serverUrl: string,
    url: string,
    params: object,
    successCb: (res: any) => void,
    listLenghtCb: (listLenght: number) => void,
) {
    this.connectDatabase(method, serverUrl, url, params, (res) => {
      const params2 = {
        ...params,
        justCount: true,
        pageSize: undefined,
        page: undefined,
      };
      successCb(res);
      this.connectDatabase(method, serverUrl, url, params2, (listLenght: number) => {
        listLenghtCb(listLenght);
      });
    })
  },
  connectPHP(
    {
      path,
      params,
      success,
      error,
      isLocalhost,
      serverUrl,
      debug,
    }: {
      path: string,
      params: object,
      errorMsg: string,
      success?: (res: any) => void,
      error?: (res: any) => void,
      isLocalhost: boolean,
      serverUrl: string,
      debug?: boolean,
    },
  ) {
    const file = path.split('/')[0];
    const action = path.split('/')[1];
    setDefaultNullValue(params);
    checkData(file, action);
    if (debug) logExtraInfo(params);
    // execute call
    const realError = getErrorFunction(file, action, error);
    const realSuccess = getSuccessFunction(file, action, params, success, realError);
    const url = `${serverUrl}php/${file}.php`;
    const realParams = {
      ...params,
      action,
      _subdomain: isLocalhost ? 'localhost' : '',
    };
    axios.post(url, realParams).then(realSuccess).catch(realError);
  },
  connectDoublePHP(
    {
      path,
      params,
      errorMsg,
      cb1,
      cb2,
      debug,
      isLocalhost,
      serverUrl,
    }: {
      path: string,
      params: object,
      errorMsg: string,
      cb1: (res: any) => void,
      cb2: (res: any) => void,
      debug?: boolean,
      isLocalhost: boolean,
      serverUrl: string,
    },
  ) {
    if (!cb1) return;
    this.connectPHP({
      path,
      params,
      errorMsg,
      debug,
      isLocalhost,
      serverUrl,
      success: (res) => {
        cb1(res);
        const params2 = {
          ...params,
          itemsPerPage: undefined,
          pageSize: undefined,
          page: undefined,
          justCount: true,
        };
        if (!cb2) return;
        this.connectPHP({
          path,
          params: params2,
          errorMsg,
          debug,
          isLocalhost,
          serverUrl,
          success: (res2: any) => {
            cb2(res2[0].totalCount || 0);
          },
        });
      },
    });
  },
}

// PHP CONECTION
const errorConsoleStyle = 'background: #EA5455; color: white; display: block;';
const alertConsoleStyle = 'background: #FF851B; color: white; display: block;';
const myNullValuePHP = '1A5v9sx7f6x3s4e6a';

function logQueryDB(fullQuery: any) {
  if (typeof fullQuery !== 'object'
  || typeof fullQuery[0] !== 'string'
  || typeof fullQuery[1] !== 'string'
  || typeof fullQuery[2] !== 'object'
  ) {
    console.log('ERROR EN DB:', fullQuery);
    return;
  }
  console.log('fullQuery', fullQuery);
  let [query] = fullQuery;
  const [, paramsType, params] = fullQuery;
  params.forEach((value: any, index: number) => {
    const type = paramsType[index];
    if (value === myNullValuePHP) {
      value = 'NULL';
    } else if (type === 's') {
      value = `"${value}"`;
    }
    query = query.replace('?', value);
  });
  console.log(query);
}
function setDefaultNullValue(params: object) {
  if (params) {
    Object.keys(params).forEach(key => {
      if (qmObj.getValueByKey(params, key) === null) {
        qmObj.setValueByKey(params, key, myNullValuePHP);
      }
    });
  }
}
function checkData(file: string, action: string) {
  // check data
  let missing = '';
  if (!file) missing = 'file';
  if (!action) missing = 'action';
  if (missing) {
    const msg1 = `Se necesita recibir "${missing}" para continuar en`;
    const msg2 = `${file || '*not file*'} -> ${action || '*not action*'}`;
    console.log(`%c ${msg1}`, errorConsoleStyle);
    console.log(`%c ${msg2}`, alertConsoleStyle);
    // if (this.isLocalhost) this.rsNotifyError(msg1); // fix
  }
}
function logExtraInfo(params?: object, res = { data: '', exception: '', query: '' }) {
  console.groupCollapsed('Extra info');
  if (res.exception) console.log(res.exception);
  if (res.query) console.log(res.query);
  if (typeof params !== 'undefined') {
    // @ts-ignore
    console.table('params', params);
  } else {
    console.log('%c No se recibieron params', alertConsoleStyle);
  }
  if (res.data) {
    logQueryDB(res.data);
  }
  console.trace(); // hidden in collapsed group
  console.groupEnd();
}
function getSuccessFunction(
  file: string,
  action: string,
  params?: object,
  success?: (res: any) => void,
  error?: (res: any) => void,
) {
  return (res: any) => {
    if (res.data.error) {
      if (error) error(res.data.error);
      logExtraInfo(params, res.data);
    } else {
      if (!res.data.data && res.data.data !== 0) {
        console.log(`%c Error | Hubo un problema con la action "${action}" en "${file}"`, errorConsoleStyle);
        logExtraInfo(params, res);
        logQueryDB(res.data);
      }
      if (success) {
        // if (successMsg) this.rsNotifySuccess(successMsg); // fix
        success(res.data.data);
      }
    }
  };
}
function getErrorFunction(
  file: string,
  action: string,
  error?: (err: any) => void,
) {
  return (err: any) => {
    // this.rsNotifyError(errorMsg); // fix
    console.log(`%c Error de PHP: ${file}/${action}`, errorConsoleStyle);
    console.log('Error:', err);
    console.groupCollapsed('Trace');
    console.trace();
    console.groupEnd();
    if (error) error(err);
  };
}
