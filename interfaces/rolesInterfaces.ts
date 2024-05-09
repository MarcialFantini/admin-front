export interface RoleItemInterface {
  id: string;
  name: string;
}

export interface RolesResponseCreateInterface {
  code: number;
  data: RoleItemInterface;
  message: string;
}

export interface GetRolesResponse {
  code: number;
  data: RoleItemInterface[];
  message: string;
}

export interface RolesStateReducer {
  list: RoleItemInterface[];
  sections: { id: string; section: string }[];
  sectionsByRole: sectionsOfRole[];
}

export interface responseCategoryNormal {
  data: string[];
  message: string;
  code: number;
}

export interface rolesSectionsInterface {
  id?: string;
  role_id: string;
  section: string;
}

export interface responseRolesSections {
  data: sectionsOfRole[];
  message: string;
  code: number;
}

export interface sectionsOfRole {
  id: string;
  section: string;
}
