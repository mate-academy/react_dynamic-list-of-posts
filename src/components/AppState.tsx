import { createContext, useReducer } from 'react';
import {
  ErrorMessage,
  Post,
  User,
  Comment,
  LoadingType,
  Action,
  ActionType,
} from '../types';

type AppStateType = {
  posts: Post[];
  users: User[];
  comments: Comment[];
  selectedUser: User | null;
  selectedPost: Post | null;
  loadingType: LoadingType;
  errorMessage: ErrorMessage;
};

type DispatchType = React.Dispatch<Action>;

const initialState: AppStateType = {
  posts: [],
  users: [],
  comments: [],
  selectedUser: null,
  selectedPost: null,
  loadingType: LoadingType.NoLoading,
  errorMessage: ErrorMessage.NoError,
};

export const AppContext = createContext<AppStateType>(initialState);
export const AppDispatchContext = createContext<DispatchType>(() => {});

const stateReducer = (state: AppStateType, action: Action) => {
  switch (action.type) {
    case ActionType.SetUsers:
      return {
        ...state,
        users: action.payload,
      };
    case ActionType.SetPosts:
      return {
        ...state,
        posts: action.payload,
      };
    case ActionType.SetComments:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.SetSelectedUser:
      return {
        ...state,
        comments: [],
        selectedUser: action.payload,
        selectedPost: null,
      };
    case ActionType.SetSelectedPost:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case ActionType.SetLoadingType:
      return {
        ...state,
        loadingType: action.payload,
      };
    case ActionType.SetErrorMessage:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ActionType.AddComment:
      return {
        ...state,
        comments: state.comments.concat(action.payload),
      };
    case ActionType.DeleteComment:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload,
        ),
      };
    case ActionType.RestoreComment:
      const { comment, index } = action.payload;
      const newComments = [...state.comments];

      newComments.splice(index, 0, comment);

      return {
        ...state,
        comments: newComments,
      };
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const AppState: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
