import React, { createContext, useEffect, useState } from 'react';
import { User } from '../../types/User';
import {
  deleteComment,
  getComments,
  getPosts,
  getUsers,
} from '../../api/lists';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  errorCommentsMessage: string;
  setErrorCommentsMessage: (v: string) => void;
  handlePostsOfSelectUser: (v: User) => void;
  handleDeleteComment: (v: Comment) => void;
  handleOpenPost: (post: Post) => void;
  isButtonComment: boolean;
  setIsButtonComment: (v: boolean) => void;
  comments: Comment[];
  setComments: (v: Comment[]) => void;
  selectPost: Post | null;
  setSelectPost: (v: Post | null) => void;
  errorPostsMessage: string;
  setErrorPostsMessage: (v: string) => void;
  isPostNotification: string;
  setIsPostNotification: (v: string) => void;
  apiLoad: boolean;
  setApiLoad: (v: boolean) => void;
  postLoad: boolean;
  setPostLoad: (v: boolean) => void;
  postsList: Post[];
  setPostList: (v: Post[]) => void;
  selectedUser: User | null;
  setSelectedUser: (v: User | null) => void;
  isActive: boolean;
  setIsActive: (v: boolean) => void;
  usersList: User[];
  setUsersList: (v: User[]) => void;
};

export const ContextList = createContext<ContextType>({
  errorCommentsMessage: '',
  setErrorCommentsMessage: () => {},
  handlePostsOfSelectUser: () => {},
  handleDeleteComment: () => {},
  handleOpenPost: () => {},
  isButtonComment: false,
  setIsButtonComment: () => [],
  comments: [],
  setComments: () => [],
  selectPost: null,
  setSelectPost: () => {},
  errorPostsMessage: '',
  setErrorPostsMessage: () => {},
  isPostNotification: '',
  setIsPostNotification: () => {},
  apiLoad: false,
  setApiLoad: () => {},
  postLoad: false,
  setPostLoad: () => {},
  postsList: [],
  setPostList: () => [],
  selectedUser: null,
  setSelectedUser: () => {},
  isActive: false,
  setIsActive: () => {},
  usersList: [],
  setUsersList: () => [],
});

export const ListProvider: React.FC<Props> = ({ children }) => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postsList, setPostList] = useState<Post[]>([]);
  const [selectPost, setSelectPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [apiLoad, setApiLoad] = useState(false);
  const [postLoad, setPostLoad] = useState(false);
  const [isPostNotification, setIsPostNotification] = useState('');
  const [errorPostsMessage, setErrorPostsMessage] = useState('');
  const [errorCommentsMessage, setErrorCommentsMessage] = useState('');
  const [isButtonComment, setIsButtonComment] = useState(false);

  useEffect(() => {
    getUsers().then(setUsersList);
  }, []);

  const handleOpenPost = (post: Post) => {
    setIsButtonComment(false);
    setPostLoad(true);
    setErrorCommentsMessage('');

    if (post.id !== selectPost?.id) {
      setSelectPost(post);
    } else {
      setSelectPost(null);
    }

    getComments(post.id)
      .then(setComments)
      .catch(() => {
        setComments([]);
        setErrorCommentsMessage('Something went wrong!');
      })
      .finally(() => setPostLoad(false));
  };

  const handleDeleteComment = (comment: Comment) => {
    const oldCommemts = [...comments];

    setComments(prevComment =>
      prevComment.filter(currentComment => currentComment.id !== comment.id),
    );

    deleteComment(comment.id).catch(() => {
      setComments(oldCommemts);
    });
  };

  const handlePostsOfSelectUser = (user: User) => {
    setSelectedUser(user);
    setErrorPostsMessage('');
    setApiLoad(true);
    setIsActive(false);

    getPosts(user.id)
      .then(response => {
        if (response.length === 0) {
          setIsPostNotification('No posts yet');
        } else {
          setIsPostNotification('');
        }

        setPostList(response);
      })
      .catch(() => {
        setErrorPostsMessage('Something went wrong!');
      })
      .finally(() => {
        setApiLoad(false);
      });
  };

  const postTools = {
    errorCommentsMessage,
    setErrorCommentsMessage,
    handlePostsOfSelectUser,
    handleDeleteComment,
    postLoad,
    setPostLoad,
    handleOpenPost,
    isButtonComment,
    setIsButtonComment,
    comments,
    setComments,
    selectPost,
    setSelectPost,
    errorPostsMessage,
    setErrorPostsMessage,
    isPostNotification,
    setIsPostNotification,
    apiLoad,
    setApiLoad,
    postsList,
    setPostList,
    selectedUser,
    setSelectedUser,
    isActive,
    setIsActive,
    usersList: usersList,
    setUsersList: setUsersList,
  };

  return (
    <ContextList.Provider value={postTools}>{children}</ContextList.Provider>
  );
};
