import { createContext, useEffect } from 'react';
import { Action } from './types/Action';
import { State } from './types/State';
import { useReducer } from 'react';
import { getUsers } from './api/users';

const initialState: State = {
  users: [],
  errorMessage: '',
  selectedUser: null,
  posts: [],
  isLoading: false,
  selectedPost: null,
  hasSidebar: false,
  comments: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'loadUsers':
      return {
        ...state,
        users: action.users,
      };

    case 'setError':
      return {
        ...state,
        errorMessage: action.message,
      };

    case 'setUser':
      return {
        ...state,
        selectedUser: state.users.find(user => user.id === action.id) || null,
        errorMessage: '',
        selectedPost: null,
        hasSidebar: false,
      };

    case 'setPosts':
      return {
        ...state,
        posts: action.posts,
      };

    case 'setLoading':
      return {
        ...state,
        isLoading: action.value,
      };

    case 'toggleSideBar':
      return {
        ...state,
        hasSidebar: action.payload,
      };

    case 'setSelectedPost':
      return {
        ...state,
        selectedPost: state.posts.find(post => post.id === action.id) || null,
        comments: [],
      };

    case 'setComments':
      return {
        ...state,
        comments: action.comments,
      };

    case 'addComment':
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };

    case 'deleteComment':
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.id),
      };

    default:
      return state;
  }
};

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();

        dispatch({ type: 'loadUsers', users });
      } catch (error) {
        dispatch({ type: 'setError', message: 'Something went wrong!' });
      }
    };

    fetchData();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
