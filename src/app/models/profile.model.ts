import { Menu } from "./menu-item.model";
import { ResponsePaginated } from "./response.model";

export type Profile = {
  id: number;
  name: string;
  name_key: string;
  state: number;
}

export interface ProfileModule {
  id: number;
  profile_id: number;
  module_id: number;
}

export type ProfileWithModules = {
  id: number;
  name: string;
  name_key: string;
  state: number;
  modules : ProfileModule[];
}

export type ProfileRequest = {
  name?: string;
  state?: number;
  page?: number;
  per_page?: number;
}

export type ProfileResponse = ResponsePaginated<ProfileWithModules[]>;
