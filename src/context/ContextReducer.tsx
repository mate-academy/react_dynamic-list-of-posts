/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import { User } from '../types/User';
import { getPost, getUsers } from '../utils/functionFetch';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Action =
  | { type: 'setUsers'; payload: User[] }
  | { type: 'unsetUsers' }
  | { type: 'setUserId'; userId: number }
  | { type: 'setPost'; payload: Post[] }
  | { type: 'Dropdown-active-disable' }
  | { type: 'fetch-active' }
  | { type: 'fetch-disable' }
  | { type: 'openPostDetails'; currentId: number }
  | { type: 'setWhriteComment' }
  | { type: 'unsetWhriteComment' }
  | { type: 'setPostByCurrentId'; payload: Post }
  | { type: 'setName'; name: string }
  | { type: 'setEmail'; email: string }
  | { type: 'setBody'; body: string }
  | { type: 'addComment' }
  | { type: 'unsetFetchOfAddComent' }
  | { type: 'deleteComment'; currentId: number }
  | { type: 'unsetFetchOfDeleteComent' }
  | { type: 'setError'; value: boolean }
  | { type: 'closePostDetails' };

interface State {
  Users: User[];
  UserId: number;
  Dropdown: boolean;
  Posts: Post[];
  Post: Post | null;
  fetch: boolean;
  openButton: boolean;
  currentPostId: number;
  whriteComment: boolean;
  fetchOfAddComent: boolean;
  signalAdd: boolean;
  newComment: Omit<Comment, 'id'>;
  fetchOfDeleteComent: boolean;
  signaDelete: boolean;
  deleteId: number;
  errorPost: boolean;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setUsers':
      return {
        ...state,
        Users: action.payload,
      };

    case 'unsetUsers':
      return {
        ...state,
        unsetDropDown: state.Dropdown ? false : true,
      };

    case 'setUserId':
      return {
        ...state,
        UserId: action.userId,
      };

    case 'setPost':
      return {
        ...state,
        Posts: action.payload,
      };

    case 'Dropdown-active-disable':
      return {
        ...state,
        Dropdown: state.Dropdown ? false : true,
      };

    case 'fetch-active':
      return {
        ...state,
        fetch: true,
      };

    case 'fetch-disable':
      return {
        ...state,
        fetch: false,
      };

    case 'openPostDetails':
      return {
        ...state,
        currentPostId: action.currentId,
        openButton: true,
      };

    case 'setWhriteComment':
      return {
        ...state,
        whriteComment: true,
      };

    case 'unsetWhriteComment':
      return {
        ...state,
        whriteComment: false,
      };

    case 'setPostByCurrentId':
      return {
        ...state,
        Post: action.payload,
      };

    case 'setName':
      return {
        ...state,
        newComment: {
          ...state.newComment,
          postId: state.currentPostId,
          name: action.name,
        },
      };

    case 'setEmail':
      return {
        ...state,
        newComment: {
          ...state.newComment,
          email: action.email,
        },
      };

    case 'setBody':
      return {
        ...state,
        newComment: {
          ...state.newComment,
          body: action.body,
        },
      };

    case 'addComment':
      return {
        ...state,
        fetchOfAddComent: true,
        signalAdd: state.signalAdd ? false : true,
      };

    case 'unsetFetchOfAddComent':
      return {
        ...state,
        fetchOfAddComent: false,
      };

    case 'deleteComment':
      return {
        ...state,
        deleteId: action.currentId,
        fetchOfDeleteComent: true,
        signaDelete: state.signaDelete ? false : true,
      };

    case 'unsetFetchOfDeleteComent':
      return {
        ...state,
        fetchOfDeleteComent: false,
      };

    case 'setError':
      return {
        ...state,
        errorPost: action.value,
      };

    case 'closePostDetails':
      return {
        ...state,
        openButton: false,
        currentPostId: 0,
      };

    default:
      return state;
  }
};

const initialState: State = {
  Users: [],
  Dropdown: false,
  UserId: 0,
  Posts: [],
  fetch: false,
  openButton: false,
  currentPostId: 0,
  Post: null,
  whriteComment: false,
  fetchOfAddComent: false,
  signalAdd: false,
  newComment: {
    postId: 0,
    name: '',
    email: '',
    body: '',
  },
  fetchOfDeleteComent: false,
  signaDelete: false,
  deleteId: 0,
  errorPost: false,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobarProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.UserId) {
      getPost()
        .then(posts => {
          const filteredPost = posts.filter(
            post => post.userId === state.UserId,
          );

          dispatch({ type: 'setPost', payload: filteredPost });
          dispatch({ type: 'fetch-active' });
        })
        .catch(() => {
          dispatch({ type: 'setError', value: true });
        })
        .finally(() => {
          setTimeout(() => {
            dispatch({ type: 'fetch-disable' });
          }, 300);
        });
    }

    if (!state.Dropdown) {
      getUsers()
        .then(users => {
          dispatch({ type: 'setUsers', payload: users });
        })
        .catch(() => {
          dispatch({ type: 'setError', value: true });
        })
        .finally(() => {
          setTimeout(() => {
            dispatch({ type: 'fetch-disable' });
          }, 300);
        });
    }
  }, [state.UserId]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
