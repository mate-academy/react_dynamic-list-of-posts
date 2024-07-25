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
  hasCommentError: false,
  selectedUserId: null,
  selectedPostId: null,
  isUsersLoading: false,
  isPostsLoading: false,
  isCommentsLoading: false,
  isAddCommentLoading: false,
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
  | { type: 'SET_COMMENTERROR'; payload: boolean }
  | { type: 'SET_SELECTEDUSERID'; payload: number }
  | { type: 'SET_USERSLOADER'; payload: boolean }
  | { type: 'SET_POSTSLOADER'; payload: boolean }
  | { type: 'SET_ADDBUTTONLOADER'; payload: boolean }
  | { type: 'SET_COMMENTSLOADER'; payload: boolean }
  | { type: 'SET_SELECTEDPOSTID'; payload: number | null }
  | { type: 'SET_COMMENTFORM'; payload: boolean }
  | { type: 'SET_SIDEBAR'; payload: boolean };

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
    case 'SET_COMMENTERROR':
      newStates = { ...newStates, hasCommentError: action.payload };
      break;
    case 'SET_SELECTEDUSERID':
      newStates = { ...newStates, selectedUserId: action.payload };
      break;
    case 'SET_USERSLOADER':
      newStates = { ...newStates, isUsersLoading: action.payload };
      break;
    case 'SET_POSTSLOADER':
      newStates = { ...newStates, isPostsLoading: action.payload };
      break;
    case 'SET_COMMENTSLOADER':
      newStates = { ...newStates, isCommentsLoading: action.payload };
      break;
    case 'SET_ADDBUTTONLOADER':
      newStates = { ...newStates, isAddCommentLoading: action.payload };
      break;
    case 'SET_SELECTEDPOSTID':
      newStates = { ...newStates, selectedPostId: action.payload };
      break;
    case 'SET_COMMENTFORM':
      newStates = { ...newStates, isCommentFormActive: action.payload };
      break;
    case 'SET_SIDEBAR':
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
