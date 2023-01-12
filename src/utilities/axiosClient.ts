import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

export const client = {
  async get<T>(url: string) {
    const { data } = await instance.get<T>(url);

    return data;
  },

  async post<T>(url: string, postData:T) {
    const { data } = await instance.post<T>(url, postData);

    return data;
  },

  async put<T>(url: string, updateData:T) {
    const { data } = await instance.put<T>(url, updateData);

    return data;
  },

  async delete(url: string) {
    return instance.delete(url);
  },
};
