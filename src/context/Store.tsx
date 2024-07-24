import { createContext, useReducer } from 'react';
import { States } from '../types/States';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

const initialStates: States = {
  users: [],
  postsByUserId: [],
  commentsByPostId: [],
  errorMessage: '',
  commentErrorMessage: '',
  selectedUserId: null,
  selectedPostId: null,
  isLoading: false,
  isCommentFormActive: false,
  isSidebarOpen: false,
};

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_POSTSBYUSERID'; payload: Post[] }
  | { type: 'SET_COMMENTSBYPOSTID'; payload: Comment[] }
  | { type: 'SET_ERRORMESSAGE'; payload: string }
  | { type: 'SET_COMMENTERRORMESSAGE'; payload: string }
  | { type: 'SET_SELECTEDUSERID'; payload: number }
  | { type: 'SET_ISLOADING'; payload: boolean }
  | { type: 'SET_SELECTEDPOSTID'; payload: number | null }
  | { type: 'SET_COMMENTFORMACTIVE'; payload: boolean }
  | { type: 'SET_ISSIDEBAROPEN'; payload: boolean };

function reducer(states: States, action: Action) {
  let newStates = { ...states };

  switch (action.type) {
    case 'SET_USERS':
      newStates = { ...newStates, users: action.payload };
      break;
    case 'SET_POSTSBYUSERID':
      newStates = { ...newStates, postsByUserId: action.payload };
      break;
    case 'SET_COMMENTSBYPOSTID':
      newStates = { ...newStates, commentsByPostId: action.payload };
      break;
    case 'SET_ERRORMESSAGE':
      newStates = { ...newStates, errorMessage: action.payload };
      break;
    case 'SET_COMMENTERRORMESSAGE':
      newStates = { ...newStates, errorMessage: action.payload };
      break;
    case 'SET_SELECTEDUSERID':
      newStates = { ...newStates, selectedUserId: action.payload };
      break;
    case 'SET_ISLOADING':
      newStates = { ...newStates, isLoading: action.payload };
      break;
    case 'SET_SELECTEDPOSTID':
      newStates = { ...newStates, selectedPostId: action.payload };
      break;
    case 'SET_COMMENTFORMACTIVE':
      newStates = { ...newStates, isCommentFormActive: action.payload };
      break;
    case 'SET_ISSIDEBAROPEN':
      newStates = { ...newStates, isSidebarOpen: action.payload };
      break;
    default:
      return states;
  }

  return newStates;
}

export const StatesContext = createContext(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
    </DispatchContext.Provider>
  );
};
