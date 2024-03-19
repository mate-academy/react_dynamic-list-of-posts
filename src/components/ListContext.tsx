import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { getComments, getPosts, getUsers } from '../api/api';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Context = {
  users: User[];
  selectedUser: User | null;
  posts: Post[];
  setSelectedUser: (u: User | null) => void;
  errorMessage: string;
  setErrorMessage: (m: string) => void;
  errorMessageComment: string;
  setErrorMessageComment: (m: string) => void;
  isLoadingPosts: boolean;
  isLoadingComments: boolean;
  selectedPost: Post | null;
  setSelectedPost: (p: Post | null) => void;
  comments: Comment[];
  setComments: (c: Comment[]) => void;
  delCommentFromState: (id: number) => void;
  addComment: boolean;
  setAddComment: (b: boolean) => void;
};

export const ListContext = React.createContext<Context>({
  users: [],
  selectedUser: null,
  posts: [],
  setSelectedUser: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  errorMessageComment: '',
  setErrorMessageComment: () => {},
  isLoadingPosts: false,
  isLoadingComments: false,
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
  delCommentFromState: () => {},
  addComment: false,
  setAddComment: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ListProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageComment, setErrorMessageComment] = useState('');
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    setErrorMessage('');

    getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong');
      });
  }, []);

  useEffect(() => {
    setErrorMessage('');
    setSelectedPost(null);

    if (selectedUser) {
      setIsLoadingPosts(true);

      getPosts(selectedUser.id)
        .then(data => {
          setPosts(data);
        })
        .catch(() => {
          setErrorMessage('Something went wrong');
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
  }, [selectedUser]);

  useEffect(() => {
    setErrorMessageComment('');

    if (selectedPost) {
      setIsLoadingComments(true);

      getComments(selectedPost.id)
        .then(data => {
          setComments(data);
        })
        .catch(() => {
          setErrorMessageComment('Something went wrong');
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
  }, [selectedPost]);

  const delCommentFromState = (commentId: number) => {
    const currentComments = [...comments].filter(comment => {
      return comment.id !== commentId;
    });

    setComments(currentComments);
  };

  const objectContext = {
    users,
    selectedUser,
    posts,
    setSelectedUser,
    errorMessage,
    setErrorMessage,
    isLoadingPosts,
    isLoadingComments,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
    delCommentFromState,
    errorMessageComment,
    setErrorMessageComment,
    addComment,
    setAddComment,
  };

  return (
    <ListContext.Provider value={objectContext}>
      {children}
    </ListContext.Provider>
  );
};
