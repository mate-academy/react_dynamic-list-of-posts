import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { appReducer as reducer } from './reducer';
import { State } from '../types/State';
import { InitialContext } from '../types/InitialContext';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getUsers } from '../api-services/users';
import { getUserPosts } from '../api-services/posts';
import * as commentService from '../api-services/comments';
import { Error } from '../types/Notification';

const initialState: State = {
  users: [],
  selectedUser: null,
  posts: [],
  selectedPost: null,
  comments: [],
  error: '',
  loading: false,
};

const init: InitialContext = {
  state: initialState,
  methods: {
    setUsers: () => {},
    setSelectedUser: () => {},
    setPosts: () => new Promise(() => {}),
    setSelectedPost: () => {},
    setComments: () => new Promise(() => {}),
    addComment: () => new Promise(() => {}),
    deleteComment: () => new Promise(() => {}),
    setError: () => {},
    setLoading: () => {},
  },
};

const AppContext = createContext<InitialContext>(init);

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (value: boolean) => {
    dispatch({ type: 'setLoading', payload: value });
  };

  const setError = (errorMessage: string) => {
    dispatch({ type: 'setError', payload: errorMessage });
  };

  const setUsers = (users: User[]) => {
    dispatch({ type: 'setUsers', payload: users });
  };

  const setSelectedUser = (user: User | null) => {
    dispatch({ type: 'selectUser', payload: user });
  };

  const setSelectedPost = (post: Post | null) => {
    dispatch({ type: 'selectPost', payload: post });
  };

  const setPosts = useCallback((userId: number) => {
    setLoading(true);
    setSelectedPost(null);

    return getUserPosts(userId)
      .then(posts => dispatch({ type: 'setPosts', payload: posts }))
      .catch(() => {
        setError(Error.PostsError);
      })
      .finally(() => setLoading(false));
  }, []);

  const setComments = (comments: Comment[]) => {
    dispatch({ type: 'setComments', payload: comments });
  };

  const addComment = (comment: Omit<Comment, 'id'>) => {
    return commentService
      .addComment(comment)
      .then(savedComment =>
        dispatch({ type: 'addComment', payload: savedComment }),
      )
      .catch(error => {
        setError('Unable to add a comment');
        throw error;
      });
  };

  const deleteComment = (commentId: number) => {
    return commentService
      .deleteComment(commentId)
      .then(() => dispatch({ type: 'deleteComment', payload: commentId }))
      .catch(error => {
        setError('Unable to delete a comment');
        throw error;
      });
  };

  const methods = {
    setUsers,
    setSelectedUser,
    setPosts,
    setSelectedPost,
    setComments,
    addComment,
    deleteComment,
    setError,
    setLoading,
  };

  useEffect(() => {
    getUsers()
      .then(users => {
        setUsers(users);
      })
      .catch(() => {
        setError('Unable to load users');
      });
  }, []);

  const value: InitialContext = { state, methods };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
