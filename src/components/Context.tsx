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
  postComments: [{
    id: 0, postId: 0, name: '', email: '', body: '',
  }],
  setPostComments: () => { },
  errorM: false,
  setErrorM: () => { },
  post: {
    id: 0, userId: 0, title: '', body: '',
  },
  setPost: () => { },
  setNewComment: () => { },
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
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [errorM, setErrorM] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setIsLoadingComments(true);

    getUserCommentsByPostId(selectedPostId)
      .then((data) => setPostComments(data))
      .catch(() => setErrorM(true))
      .finally(() => {
        setIsLoadingComments(false);
        setNewComment(false);
      });
  }, [selectedPostId, newComment]);

  useEffect(() => {
    if (!selectedPostId) {
      return;
    }

    setPost(userPosts.find(p => p.id === selectedPostId));
  }, [userPosts, selectedPostId]);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setIsLoadingList(true);

    getUserPosts(selectedUser)
      .then((data) => setUserPosts(data))
      .finally(() => setIsLoadingList(false));
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
        errorM,
        setErrorM,
        post,
        setPost,
        setNewComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
