export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface Auth {
  email: string;
  password: string,
}