import { useContext } from 'react';
import { GlobalContext } from '../context/ListContext';

export const useGlobalContext = () => useContext(GlobalContext);
