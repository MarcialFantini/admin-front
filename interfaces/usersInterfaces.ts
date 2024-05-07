export interface UserItem {
  id: string;
  name: string;
  email: string;
  password: string;
  role_id: string;
}

export interface UserForm {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

export interface CreateUserResponse {
  data: UserItem;
  code: number;
  message: string;
}

export interface getUserResponse {
  data: UserItem[];
  code: number;
  message: string;
}

export interface UserStateReducer {
  list: UserItem[];
  isLogin: boolean;
  token: string;
}

export interface ResponseDataLogin {
  data: DataLogin;
  message: string;
  code: number;
}

export interface DataLogin {
  token: string;
}
