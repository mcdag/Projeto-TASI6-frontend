export interface User {
  id?: string;
  authToken?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface Auth {
  username: string;
  password: string,
}