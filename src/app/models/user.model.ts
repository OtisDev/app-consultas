import { Area } from "./area.model";
import { Menu, MenuItem } from "./menu-item.model";
import { Profile } from "./profile.model";
import { Paginate, Response, ResponsePaginated } from "./response.model";

export type User = {
  DNI: string;
  apepaterno: string;
  apematerno: string;
  nombres: string;
  nom_comp: string;
  login:string;
  estado: string;
  area_asignada: string;
  Nivel: string;
  state: number;
}

export type UserOfficeProfile = {
  id: number;
  n_oficina: string;
  profile_id: number;
  usuario_dni: string;
  office: Area;
  profile: Profile;
  state: number;
}

export type UserModule = {
  estado: string;
  module_id: number;
  module: MenuItem;
}

export type UserR = User & {
  modules: UserModule[];
  offices_profiles: UserOfficeProfile[];
}

export interface TokenResponse{
  access_token: string;
  token_type: string;
  expires_in: number;
}

export type UserSession = TokenResponse & {
  user: UserR;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export type UserResponse = Response<UserSession>;
export type UsersResponse = ResponsePaginated<UserR[]>;

export type UsersRequest = {
  page?: number;
  per_page?: number;
  dni: string;
  apepaterno: string;
  apematerno: string;
  nombres:string;
  nivel: string;
  state : string;
};

export type UserPermisionsRequest = {
  n_oficina: string;
  profile_id: number;
};

export type UserPermissionsResponse = Response<Menu[]>;

export type UserCreateUpdateRequest = {
  DNI: string;
  apepaterno: string;
  apematerno: string;
  nombres: string;
  login: string;
  clave: string;
};

export type UserAssignOfficeProfileRequest = {
  n_oficina: string;
  profile_id: number;
  usuario_dni: string;
};

export type UserOfficeProfileResponse = Response<UserOfficeProfile[]>;
