import React, { useEffect, useMemo, useReducer } from 'react';
import { getUsers } from '../api/user';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/post';

interface Props {
  children: React.ReactNode,
}

interface State {
  users: User[],
  selectedUser: User | null,
  userPosts: Post[],
  errorMessage: string,
  isLoading: boolean,
}

type Action = {
  type: 'SetUsers',
  users: User[],
} | {
  type: 'SetSelectedUser'
  user: User,
} | {
  type: 'SetUserPosts',
  posts: Post[],
} | {
  type: 'SetErrorMessage',
  errorMessage: string,
} | {
  type: 'SetIsLoading',
  isLoading: boolean,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetUsers': {
      return {
        ...state,
        users: action.users,
      };
    }

    case 'SetSelectedUser': {
      return {
        ...state,
        selectedUser: action.user,
      };
    }

    case 'SetUserPosts': {
      return {
        ...state,
        userPosts: action.posts,
      };
    }

    case 'SetErrorMessage': {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }

    case 'SetIsLoading': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    default:
      return state;
  }
}

export const UserUpdateContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedUser: (_user: User) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setErrorMessage: (_errorMessage: string) => { },
});

export const UsersContext = React.createContext({
  users: [] as User[],
  selectedUser: {} as User | null,
  userPosts: [] as Post[],
  errorMessage: '',
  isLoading: false,
});

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    selectedUser: null,
    userPosts: [],
    errorMessage: '',
    isLoading: false,
  });

  function setUsers(users: User[]) {
    dispatch({
      type: 'SetUsers',
      users,
    });
  }

  function setErrorMessage(errorMessage: string) {
    dispatch({
      type: 'SetErrorMessage',
      errorMessage,
    });
  }

  function setSelectedUser(user: User) {
    dispatch({
      type: 'SetIsLoading',
      isLoading: true,
    });

    dispatch({
      type: 'SetSelectedUser',
      user,
    });

    getUserPosts(user.id)
      .then(posts => {
        dispatch({
          type: 'SetUserPosts',
          posts,
        });
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        dispatch({
          type: 'SetIsLoading',
          isLoading: false,
        });
      });
  }

  useEffect(() => {
    getUsers()
      .then(setUsers);
  }, []);

  const userUpdateContextValue = useMemo(() => ({
    setSelectedUser,
    setErrorMessage,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  const userContextValue = useMemo(() => ({
    users: state.users,
    selectedUser: state.selectedUser,
    userPosts: state.userPosts,
    errorMessage: state.errorMessage,
    isLoading: state.isLoading,
  }), [state]);

  return (
    <UserUpdateContext.Provider value={userUpdateContextValue}>
      <UsersContext.Provider value={userContextValue}>
        {children}
      </UsersContext.Provider>
    </UserUpdateContext.Provider>
  );
};
