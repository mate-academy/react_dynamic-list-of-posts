import { useContext } from 'react';
import { CommentsContext } from '../context/ListContext';

export const useCommentsContext = () => useContext(CommentsContext);
