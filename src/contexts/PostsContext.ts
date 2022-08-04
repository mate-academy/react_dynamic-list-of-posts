import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type PostsContextType = {
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  selectedPostId: number,
  setSelectedPostId: (selectedPostId: number) => void,
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
};

export const PostsContext = React.createContext<PostsContextType>({
  posts: [],
  setPosts: () => {},
  selectedPostId: 0,
  setSelectedPostId: () => {},
  comments: [],
  setComments: () => {},
});
