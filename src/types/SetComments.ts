import { Dispatch, SetStateAction } from 'react';
import { Comment } from './Comment';

export interface SetComments {
  setComments: Dispatch<SetStateAction<Comment[]>>;
}
