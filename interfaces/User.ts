export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}

export interface Auth {
  email: string;
  password: string,
}