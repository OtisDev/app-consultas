import { environment } from "../../environments/environment";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${environment.apiUrl}/auth/login`,
    LOGOUT: `${environment.apiUrl}/auth/logout`,
    REFRESH: `${environment.apiUrl}/auth/refresh`,
  },
  USER: {
    GET_ALL: `${environment.apiUrl}/users`,
    CREATE: `${environment.apiUrl}/users/create`,
    UPDATE: (id : number) => `${environment.apiUrl}/users/update/${id}`,
    GET_USER: (username : string) => `${environment.apiUrl}/users/info/${username}`,
    UPDATE_STATE: (id : number) => `${environment.apiUrl}/users/toggle-active/${id}`,
    DELETE: (id : number) => `${environment.apiUrl}/users/delete/${id}`,
  },
  CLIENTS:{
    GET_ALL: `${environment.apiUrl}/clients`,
    GET_ALL_LIST: `${environment.apiUrl}/clients/list`,
    CREATE: `${environment.apiUrl}/clients/create`,
    UPDATE: (id : number) => `${environment.apiUrl}/clients/update/${id}`,
    UPDATE_STATE: (id : number) => `${environment.apiUrl}/clients/toggle-active/${id}`,
    DELETE: (id : number) => `${environment.apiUrl}/clients/delete/${id}`,
  },
  CONSULT:{
    DNI: `${environment.apiUrl}/dni`,
    RUC: `${environment.apiUrl}/ruc`,
  },
  PROFILE:{
    LIST: `${environment.apiUrl}/profiles/list`,
  },
  ENDPOINT:{
    GET_ALL: `${environment.apiUrl}/endpoints`,
    GET_ALL_LIST: `${environment.apiUrl}/endpoints/list`,
  },
  REPORT:{
    MONTLY: `${environment.apiUrl}/report/montly`,
    DAILY: `${environment.apiUrl}/report/diary`,
  }

};
