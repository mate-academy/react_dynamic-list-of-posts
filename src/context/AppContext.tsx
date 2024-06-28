import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { State } from '../types/State';
import { AppContextType } from '../types/AppContextType';
import { Action } from '../types/Action';
import { getUsers } from '../api/users';
import { getPosts } from '../api/posts';
import { clearErrors, updateErrorStatus } from '../utils/errorHandler';
import { initialErrorState } from '../types/Error';
import { getPostComments } from '../api/comments';

type Props = {
  children: ReactNode;
};

const initialState: State = {
  users: [],
  selectedUser: {
    user: null,
    isLoading: false,
  },
  userPosts: [],
  selectedPost: {
    post: null,
    isLoading: false,
  },
  postComments: {
    comments: [],
    isWriting: false,
  },
  errors: initialErrorState,
  sidebar: false,
};

const initialAppContext: AppContextType = {
  state: initialState,
  dispatch: () => null,
};

export const AppContext = createContext(initialAppContext);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // #region user actions
    case 'LOAD_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: { ...state.selectedUser, user: action.payload },
      };
    case 'SET_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload,
      };
    case 'SET_SELECTED_POST':
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          post: action.payload,
        },
      };
    case 'LOAD_POST_COMMENTS':
      return {
        ...state,
        postComments: {
          ...state.postComments,
          comments: action.payload,
        },
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        postComments: {
          ...state.postComments,
          comments: action.payload,
        },
      };
    case 'WRITING_COMMENT_STATUS':
      return {
        ...state,
        postComments: {
          ...state.postComments,
          isWriting: action.payload,
        },
      };
    // #endregion
    // #region error actions
    case 'SET_ERROR':
      return {
        ...state,
        errors: updateErrorStatus(state.errors, action.payload.type),
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: clearErrors(state.errors),
      };
    // #endregion
    // #region loadings
    case 'SET_USER_POSTS_LOADING':
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          isLoading: action.payload,
        },
      };
    case 'SET_POST_COMMENTS_LOADING':
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          isLoading: action.payload,
        },
      };
    // #endregion
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        sidebar: action.payload,
      };
    // #region form actions
    // #endregion
    default:
      return state;
  }
};

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedUser, selectedPost } = state;
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getUsers();

        dispatch({ type: 'LOAD_USERS', payload: users });
      } catch (error) {
        throw error;
      }
    };

    loadUsers();
  }, []);

  // #region posts loading
  useEffect(() => {
    const loadUserPosts = async () => {
      dispatch({ type: 'CLEAR_ERRORS' });

      if (selectedUser.user) {
        dispatch({ type: 'SET_USER_POSTS_LOADING', payload: true });

        try {
          const userPosts = await getPosts(selectedUser.user.id);

          dispatch({ type: 'SET_USER_POSTS', payload: userPosts });
        } catch (error) {
          dispatch({
            type: 'SET_ERROR',
            payload: {
              type: 'PostsLoadingError',
            },
          });
        } finally {
          dispatch({ type: 'SET_USER_POSTS_LOADING', payload: false });
        }
      }
    };

    loadUserPosts();
  }, [selectedUser.user]);
  // #endregion

  // #region post comments loading
  useEffect(() => {
    const getComments = async () => {
      dispatch({ type: 'CLEAR_ERRORS' });

      if (selectedPost.post) {
        dispatch({ type: 'SET_POST_COMMENTS_LOADING', payload: true });

        try {
          const postComments = await getPostComments(selectedPost.post.id);

          dispatch({ type: 'LOAD_POST_COMMENTS', payload: postComments });
        } catch (error) {
          dispatch({
            type: 'SET_ERROR',
            payload: {
              type: 'CommentsError',
            },
          });
        } finally {
          dispatch({ type: 'SET_POST_COMMENTS_LOADING', payload: false });
        }
      }
    };

    getComments();
  }, [selectedPost.post]);
  // #endregion

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
