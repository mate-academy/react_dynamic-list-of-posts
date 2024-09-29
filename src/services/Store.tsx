import React, { useMemo, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { LoaderType } from '../types/LoaderType';
import { ErrorType } from '../types/ErrorType';
import { User } from '../types/User';

type PostsContextProps = {
  users: User[];
  setUsers: (prevUsers: User[]) => void;
  showUsers: boolean;
  setShowUsers: (prevValue: boolean) => void;
  selectedUserId: null | number;
  posts: Post[];
  setPosts: (prevPosts: Post[]) => void;
  setSelectedUserId: (prevUserId: null | number) => void;
  selectedPostId: null | number;
  setSelectedPostId: (prevUserId: null | number) => void;
  comments: Comment[];
  setComments: (prevUsers: Comment[]) => void;
  selectedCommentId: null | number;
  setSelectedCommentId: (pervState: number | null) => void;
  loading: LoaderType | null;
  setLoading: (prevLoadingState: LoaderType | null) => void;
  errorTypeMessage: ErrorType | null;
  setErrorTypeMessage: (prevErrorType: ErrorType | null) => void;
  showNewCommentForm: boolean;
  setShowNewCommentForm: (prevState: boolean) => void;
  formSubmition: boolean;
  setFormSubmition: (prevState: boolean) => void;
};

export const PostsContext = React.createContext<PostsContextProps>({
  users: [],
  setUsers: () => {},
  showUsers: false,
  setShowUsers: () => {},
  selectedUserId: null,
  setSelectedUserId: () => {},
  posts: [],
  setPosts: () => {},
  comments: [],
  setComments: () => {},
  selectedCommentId: null,
  setSelectedCommentId: () => {},
  selectedPostId: null,
  setSelectedPostId: () => {},
  loading: null,
  setLoading: () => {},
  errorTypeMessage: null,
  setErrorTypeMessage: () => {},
  showNewCommentForm: false,
  setShowNewCommentForm: () => {},
  formSubmition: false,
  setFormSubmition: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<null | number>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<null | number>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<null | number>(
    null,
  );
  const [loading, setLoading] = useState<LoaderType | null>(null);
  const [errorTypeMessage, setErrorTypeMessage] = useState<ErrorType | null>(
    null,
  );
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [formSubmition, setFormSubmition] = useState(false);

  const value = useMemo(
    () => ({
      users,
      setUsers,
      showUsers,
      setShowUsers,
      posts,
      setPosts,
      comments,
      setComments,
      selectedUserId,
      setSelectedUserId,
      loading,
      setLoading,
      selectedPostId,
      setSelectedPostId,
      errorTypeMessage,
      setErrorTypeMessage,
      showNewCommentForm,
      setShowNewCommentForm,
      formSubmition,
      setFormSubmition,
      selectedCommentId,
      setSelectedCommentId,
    }),
    [
      users,
      showUsers,
      posts,
      selectedUserId,
      setSelectedUserId,
      setLoading,
      loading,
      selectedPostId,
      setSelectedPostId,
      setComments,
      comments,
      errorTypeMessage,
      setErrorTypeMessage,
      showNewCommentForm,
      setShowNewCommentForm,
      selectedCommentId,
      setSelectedCommentId,
      formSubmition,
      setFormSubmition,
    ],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
