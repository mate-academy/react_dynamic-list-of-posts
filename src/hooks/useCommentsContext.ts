import { useContext } from 'react';
import { CommentsContext } from '../context/CommentsContext';

export const useCommentsContext = () => {
  return useContext(CommentsContext);
};
