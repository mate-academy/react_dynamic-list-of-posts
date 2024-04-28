import React from 'react';
import { Comment } from '../types/Comment';

type InitialContent = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const initialContent: InitialContent = {
  comments: [],
  setComments: () => {},
};

export const ComntContext = React.createContext(initialContent);
