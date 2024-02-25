import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getUsers } from '../api/users';
import { ContextProvider } from '../types/ContextProvider';
import { getPosts } from '../api/posts';
import { deleteComment, getComments, postComment } from '../api/comments';

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<ContextProvider>({
  users: [],
  setUsers: () => {},
  posts: [],
  setPosts: () => {},
  comments: [],
  setComments: () => {},
  isActiveDrop: false,
  setIsActiveDrop: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  isError: false,
  isLoader: false,
  selectedPost: null,
  setSelectedPost: () => {},
  isPostLoader: false,
  isShowForm: false,
  setIsShowForm: () => {},
  handleAddNewComment: () => {},
  setNewName: () => {},
  setNewEmail: () => {},
  newBody: '',
  setNewBody: () => {},
  isNewButtonLoading: false,
  handleDeleteComment: () => {},
  handleClearBtn: () => {},
  isNewNameError: false,
  isNewEmailError: false,
  isNewBodyError: false,
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isActiveDrop, setIsActiveDrop] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isPostLoader, setIsPostLoader] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBody, setNewBody] = useState('');
  const [isNewNameError, setIsNewNameError] = useState(false);
  const [isNewEmailError, setIsNewEmailError] = useState(false);
  const [isNewBodyError, setIsNewBodyError] = useState(false);
  const [isNewButtonLoading, setIsNewButtonLoading] = useState(false);

  useEffect(() => {
    setIsNewNameError(false);
  }, [newName]);

  useEffect(() => {
    setIsNewEmailError(false);
  }, [newEmail]);

  useEffect(() => {
    setIsNewBodyError(false);
  }, [newBody]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setSelectedPost(null);
      setIsLoader(true);

      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => setIsError(true))
        .finally(() => setIsLoader(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setIsPostLoader(true);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsPostLoader(false));
    }

    setIsShowForm(false);
  }, [selectedPost]);

  const handleAddNewComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName || !newEmail || !newBody) {
      setIsNewNameError(!newName);
      setIsNewEmailError(!newEmail);
      setIsNewBodyError(!newBody);

      return;
    }

    if (selectedPost) {
      const newComment = {
        postId: selectedPost.id,
        name: newName.trim(),
        email: newEmail.trim(),
        body: newBody.trim(),
      };

      setIsNewButtonLoading(true);

      postComment(newComment)
        .then((comment: Comment) => {
          setComments(prev => [...prev, comment]);
          setNewBody('');
        })
        .finally(() => setIsNewButtonLoading(false));
    }
  };

  const handleDeleteComment = (id: number) => {
    deleteComment(id);
    setComments(prev => prev.filter(comment => comment.id !== id));
  };

  const handleClearBtn = () => {
    setIsNewNameError(false);
    setIsNewEmailError(false);
    setIsNewBodyError(false);

    setNewBody('');
  };

  const value = {
    users,
    setUsers,
    isActiveDrop,
    setIsActiveDrop,
    isError,
    selectedUser,
    setSelectedUser,
    posts,
    setPosts,
    comments,
    setComments,
    isLoader,
    selectedPost,
    setSelectedPost,
    isPostLoader,
    isShowForm,
    setIsShowForm,
    handleAddNewComment,
    setNewName,
    setNewEmail,
    newBody,
    setNewBody,
    isNewNameError,
    isNewEmailError,
    isNewBodyError,
    isNewButtonLoading,
    handleDeleteComment,
    handleClearBtn,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
