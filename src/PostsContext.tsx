import { createContext, useReducer } from 'react';
import { ReducerType } from './types/ReducerType';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

interface State {
  user: User | null
  post: Post | null
  comments: Comment[] | null
}

const initialState: State = {
  user: null,
  post: null,
  comments: null,
};

type Action = { type: ReducerType.SetUser, payload: User }
| { type: ReducerType.SetPost, payload: Post | null }
| { type: ReducerType.SetComments, payload: Comment[] }
| { type: ReducerType.AddComment, payload: Comment }
| { type: ReducerType.DeleteComment, payload: number };

const reducerAddComment = (comments: Comment[] | null, payload: Comment) => {
  return comments
    ? [...comments, payload]
    : [payload];
};

const reducerDeleteComment = (comments: Comment[] | null, payload: number) => {
  return comments
    ? comments.filter(item => item.id !== payload)
    : null;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ReducerType.SetUser:
      return {
        ...state,
        user: action.payload,
      };

    case ReducerType.SetPost:
      return {
        ...state,
        post: action.payload,
      };

    case ReducerType.SetComments:
      return {
        ...state,
        comments: action.payload,
      };

    case ReducerType.AddComment:
      return {
        ...state,
        comments: reducerAddComment(state.comments, action.payload),
      };

    case ReducerType.DeleteComment:
      return {
        ...state,
        comments: reducerDeleteComment(state.comments, action.payload),
      };

    default:
      return state;
  }
}

export const StateContext = createContext(initialState);
export const DispatchContext
  = createContext<(action: Action) => void>(() => {});

interface Props {
  children: React.ReactNode
}

export const PostStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
