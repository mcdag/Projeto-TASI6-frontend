import { AxiosResponse } from 'axios';
import { Auth, User } from '../interfaces/User';
import apiBack from './api';

export class UserService {
  static async createUser(user: User): Promise<AxiosResponse> {
    const response = await apiBack.post(
      '/user', user,
      {
        validateStatus: status => [201, 400].includes(status),
      },
    );
    return response;
  }

  static async getLogin(auth: Auth): Promise<AxiosResponse> {
    const response = await apiBack.post(
      '/login', auth,
      {
        validateStatus: status => [200, 400].includes(status),
      },
    );
    return response;
  }
}