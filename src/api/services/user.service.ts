import axios from 'axios';
import { IUser } from '../models/user.model';

export const UserService = {
  fetchUserList: async (): Promise<IUser[]> => {
    const result = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');

    return result.data;
  },

  getUserById: async (id: number): Promise<IUser | undefined> => {
    return await axios
      .get<IUser[]>('https://jsonplaceholder.typicode.com/users/')
      .then(res => res.data.find(u => u.id === id))
      .catch(error => undefined);
  },
};
