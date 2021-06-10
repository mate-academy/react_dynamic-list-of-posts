import { getData } from './api';

export const getUsers = () => getData('/users');
