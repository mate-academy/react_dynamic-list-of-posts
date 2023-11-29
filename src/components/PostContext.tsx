import React, { useEffect, useMemo, useState } from 'react';

import * as data from '../api/data';

import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

import { MainContentType } from '../types/MainContentType';
import { PostCommentsType } from '../types/PostCommentsType';

export interface PostsContextType {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  mainContent: MainContentType,
  selectedUser: User | null,
  setSelectedUser: (selectedUser: User | null) => void,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: (selectedPost: Post | null) => void,

  comments: Comment[],
  details: PostCommentsType,
  // newComment: Comment | null,
  // setNewComment: (message: Comment | null) => void,
}

export const PostsContext = React.createContext<PostsContextType>({
  users: [],
  setUsers: () => { },
  mainContent: MainContentType.NoSelectedUser,
  selectedUser: null,
  setSelectedUser: () => { },

  posts: [],
  setPosts: () => { },
  selectedPost: null,
  setSelectedPost: () => { },

  comments: [],
  details: PostCommentsType.None,
  // newComment: null,
  // setNewComment: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments] = useState<Comment[]>([]);

  const [mainContent, setMainContent]
    = useState<MainContentType>(MainContentType.NoSelectedUser);
  const [details, setDetails]
    = useState<PostCommentsType>(PostCommentsType.None);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [newComment, setNewComment] = useState<Comment | null>(null);

  useEffect(() => {
    data.getUsers()
      .then(setUsers)
      .catch(() => setMainContent(MainContentType.PostsLoadingError));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setMainContent(MainContentType.Loader);

    data.getPosts(selectedUser.id)
      .then(currentPosts => {
        if (currentPosts.length === 0) {
          setMainContent(MainContentType.NoPostsYet);
        } else {
          setPosts(currentPosts);
          setMainContent(MainContentType.PostsList);
        }
      })
      .catch(() => setMainContent(MainContentType.PostsLoadingError));
  }, [selectedUser]);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setDetails(PostCommentsType.IsLoading);

    data.getComments(selectedPost.id)
      .then(currentComments => {
        if (currentComments.length === 0) {
          setDetails(PostCommentsType.NoCommentsMessage);
        } else {
          // console.log(currentComments)
          // setComments(currentComments);
          setDetails(PostCommentsType.CommentsList);
        }
      })
      .catch(() => setDetails(PostCommentsType.CommentsError));
  }, [selectedPost]);

  const value = useMemo(() => ({
    users,
    setUsers,
    mainContent,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    comments,
    details,
  }), [
    users, posts, mainContent, selectedUser, selectedPost, comments, details]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
