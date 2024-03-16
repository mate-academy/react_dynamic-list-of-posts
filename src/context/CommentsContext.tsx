import { createContext, useContext, useReducer } from 'react';
import { Comment } from '../types';
import { getComments } from '../utils/getComments';

type State = {
  comments: Comment[];
  isCommentsLoading: boolean;
  commentsError: string;
  isWritingComment: boolean;
  handleFetchComments: (userId: number) => void;
  handleToggleWriteComment: (toggleValue: boolean) => void;
};

const initialState: State = {
  comments: [],
  isCommentsLoading: false,
  commentsError: '',
  isWritingComment: false,
  handleFetchComments: () => {},
  handleToggleWriteComment: () => {},
};

const CommentsContext = createContext(initialState);

type Action =
  | { type: 'comments/loaded'; payload: Comment[] }
  | { type: 'rejected'; payload: string }
  | { type: 'comments/writeComment'; payload: boolean }
  | { type: 'loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isCommentsLoading: action.payload };

    case 'comments/loaded':
      return { ...state, isCommentsLoading: false, comments: action.payload };

    case 'comments/writeComment':
      return { ...state, isWritingComment: action.payload };

    case 'rejected':
      return { ...state, isCommentsLoading: false, todosError: action.payload };
    default:
      return state;
  }
}

const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [
    { comments, isCommentsLoading, commentsError, isWritingComment },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleToggleWriteComment = (toggleValue: boolean) =>
    dispatch({ type: 'comments/writeComment', payload: toggleValue });

  const handleFetchComments = async (postId: number) => {
    handleToggleWriteComment(false);
    dispatch({ type: 'loading', payload: true });
    try {
      const fetchedComments = await getComments(postId);

      dispatch({ type: 'comments/loaded', payload: fetchedComments });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'Something went wrong',
      });
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        isCommentsLoading,
        commentsError,
        isWritingComment,
        handleFetchComments,
        handleToggleWriteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

const useComments = () => {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error('CommentsContext was used outside of the CommentProvider');
  }

  return context;
};

export { useComments, CommentsProvider };
