import { useContext } from 'react';
import { UsersContext } from '../context/ListContext';

export const useUsersContext = () => useContext(UsersContext);
