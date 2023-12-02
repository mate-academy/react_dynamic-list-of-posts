import React, { useEffect, useState } from 'react';
import { ContextType } from '../types/ContextType';
import {
  getAllUsers,
  getUserCommentsByPostId,
  getUserPosts,
} from '../utils/requestService';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const AppContext = React.createContext<ContextType>({
  users: [],
  setUsers: () => { },
  userPosts: [],
  setUserPosts: () => { },
  selectedUser: 0,
  setSelectedUser: () => { },
  selectedPostId: null,
  setSelectedPostId: () => { },
  isLoadingList: false,
  setIsLoadingList: () => { },
  isLoadingComments: false,
  setIsLoadingComments: () => { },
  postComments: [],
  setPostComments: () => { },
  error: false,
  setError: () => { },
  post: null,
  setPost: () => { },
  setNewComment: () => { },
  isLoadingForm: false,
  setIsLoadingForm: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const useData = () => React.useContext(AppContext);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setIsLoadingComments(true);

    getUserCommentsByPostId(selectedPostId)
      .then((data) => setPostComments(data))
      .catch(() => setError(true))
      .finally(() => {
        setNewComment(false);
        setIsLoadingComments(false);
        setError(false);
      });
  }, [selectedPostId, newComment]);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    const filteredPosts = userPosts.find(p => p.id === selectedPostId);

    if (filteredPosts) {
      setPost(filteredPosts);
    }
  }, [userPosts, selectedPostId]);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch(() => setError(true))
      .finally(() => setError(false));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoadingList(true);

    getUserPosts(selectedUser)
      .then((data) => setUserPosts(data))
      .catch(() => setError(true))
      .finally(() => {
        setIsLoadingList(false);
        setError(false);
      });
  }, [selectedUser]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        userPosts,
        setUserPosts,
        selectedUser,
        setSelectedUser,
        selectedPostId,
        setSelectedPostId,
        isLoadingList,
        setIsLoadingList,
        isLoadingComments,
        setIsLoadingComments,
        postComments,
        setPostComments,
        error,
        setError,
        post,
        setPost,
        setNewComment,
        isLoadingForm,
        setIsLoadingForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
