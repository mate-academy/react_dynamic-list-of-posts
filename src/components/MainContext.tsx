import React, { useEffect, useState } from 'react';
import { getUsers } from '../utils/api/users';
import { getComments, getPosts } from '../utils/api/posts';
import { MainProps } from '../types/PostProps';
import { Message, Error, Warning } from '../types/Message';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Load } from '../types/Load';

export const MainContext = React
  .createContext<MainProps>({
  isReset: false,
  isError: false,
  currentUser: null,
  currentPost: null,
  comments: [],
  users: null,
  posts: null,
  isForm: false,
  notification: '',
  isAddButton: false,
  loadType: Load.None,

  setIsAddButton: () => {},
  setCurrentUser: () => {},
  setComments: () => {},
  setIsReset: () => {},
  setIsForm: () => {},
  setUsers: () => {},
  setPosts: () => {},
  setIsError: () => {},
  setLoadType: () => {},
  setCurrentPost: () => {},
  setNotification: () => {},
});

export const MainProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isAddButton, setIsAddButton] = useState(false);

  const [users, setUsers] = useState<User[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [loadType, setLoadType] = useState<Load>(Load.None);
  const [notification, setNotification] = useState<Message>('');

  useEffect(() => {
    setNotification(Warning.emptyUsers);
    getUsers()
      .then(setUsers)
      .catch(() => setNotification(Error.getUsers));
  }, []);

  useEffect(() => {
    if (currentUser) {
      setPosts(null);
      setNotification('');
      setLoadType(Load.Posts);

      getPosts(currentUser)
        .then((res) => (!Object.values(res).length
          ? setNotification(Warning.emptyPosts)
          : setPosts(res)))
        .catch(() => setNotification(Error.getPosts))
        .finally(() => setLoadType(Load.None));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentPost) {
      setIsAddButton(false);
      setNotification('');
      setLoadType(Load.Comments);

      getComments(currentPost.id)
        .then((res) => (setComments(res)))
        .catch(() => setNotification(Error.getComments))
        .finally(() => {
          setLoadType(Load.None);
          setIsAddButton(true);
        });
    }
  }, [currentPost]);

  const value: MainProps = {
    isReset,
    setIsReset,
    isError,
    setIsError,
    users,
    setUsers,
    loadType,
    setLoadType,
    posts,
    setPosts,
    notification,
    setNotification,
    currentUser,
    setCurrentUser,
    currentPost,
    setCurrentPost,
    comments,
    setComments,
    isForm,
    setIsForm,
    isAddButton,
    setIsAddButton,
  };

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
};
