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
    UPDATE: `${environment.apiUrl}/users/update`,
    GET_USER: (username : string) => `${environment.apiUrl}/users/info/${username}`,
    GET_PERMISSIONS_MODULES: `${environment.apiUrl}/user/modules`,
    UPDATE_STATE: (dni : string) => `${environment.apiUrl}/users/${dni}/update-state`,
    ASSIGN_OFFICE_PROFILE: `${environment.apiUrl}/users/assign-office-profile`,
    GET_OFFICES_PROFILES: (dni : string) => `${environment.apiUrl}/users/${dni}/offices-profiles`,
    UPDATE_STATE_OFFICE_PROFILE: (id : number) => `${environment.apiUrl}/users/${id}/offices-profiles/update-state`,
  },
  EXPEDIENT: {
    CREATE: `${environment.apiUrl}/expedient/create`,
    UPDATE: `${environment.apiUrl}/expedient/update`,
    DELETE: `${environment.apiUrl}/expedient/delete`,
    LIST: `${environment.apiUrl}/expedients`,
    HISTORY: `${environment.apiUrl}/expedient/history`,
    UNSOLVED: `${environment.apiUrl}/expedients/unsolved`,
    EXPORT: `${environment.apiUrl}/expedients/export`,
  },
  AREA: {
    LIST: `${environment.apiUrl}/offices/list`,
  },
  PROFILE:{
    LIST: `${environment.apiUrl}/profiles/list`,
  }
};
