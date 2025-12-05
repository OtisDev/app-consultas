
import { Menu, MenuItem } from "./menu-item.model";
import { Profile } from "./profile.model";
import { Paginate, Paginated, Response, ResponsePaginated } from "./response.model";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  state: number;
}

export type UserOfficeProfile = {
  id: number;
  n_oficina: string;
  profile_id: number;
  usuario_dni: string;
  office: any;
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
  user: User;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export type UserResponse = Response<UserSession>;
export type UsersResponse = ResponsePaginated<User[]>;



export type UserFilterRequest = Paginated & {
  name: string;
  username: string;
  state: number;
};

export type UserPermisionsRequest = {
  n_oficina: string;
  profile_id: number;
};

export type UserPermissionsResponse = Response<Menu[]>;

export type UserCreateUpdateRequest = {
  name: string;
  username: string;
  email: string;
  role: string;
};

export type UserAssignOfficeProfileRequest = {
  n_oficina: string;
  profile_id: number;
  usuario_dni: string;
};

export type UserOfficeProfileResponse = Response<UserOfficeProfile[]>;
