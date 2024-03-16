import { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../types';
import { getUsers } from '../utils/getUsers';

type State = {
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  usersError: string;
  handleOnSetSelectedUser: (user: User) => void;
};

const initialState: State = {
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  usersError: '',
  handleOnSetSelectedUser: () => {},
};

const UsersContext = createContext(initialState);

type Action =
  | { type: 'users/loaded'; payload: User[] }
  | { type: 'users/setSelectedUser'; payload: User }
  | { type: 'rejected'; payload: string }
  | { type: 'users/removeError' }
  | { type: 'loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isUsersLoading: action.payload };

    case 'users/loaded':
      return { ...state, isUsersLoading: false, users: action.payload };

    case 'users/setSelectedUser':
      return { ...state, selectedUser: action.payload };

    case 'rejected':
      return { ...state, isUsersLoading: false, todosError: action.payload };
    default:
      return state;
  }
}

const UsersProvider: React.FC<Props> = ({ children }) => {
  const [{ users, selectedUser, isUsersLoading, usersError }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: 'loading', payload: true });
      try {
        const fetchedUsers = await getUsers();

        dispatch({ type: 'users/loaded', payload: fetchedUsers });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'Something went wrong',
        });
      }
    };

    fetchUsers();
  }, []);

  const handleOnSetSelectedUser = (user: User) => {
    dispatch({ type: 'users/setSelectedUser', payload: user });
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        selectedUser,
        isUsersLoading,
        usersError,
        handleOnSetSelectedUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error('UsersContext was used outside of the PostProvider');
  }

  return context;
};

export { useUsers, UsersProvider };
