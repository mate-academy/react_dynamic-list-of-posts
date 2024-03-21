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
  handleAddComment: (comment: Comment) => void;
  handleDeleteComment: (commentId: number) => void;
  handleSetLoading: (value: boolean) => void;
};

const initialState: State = {
  comments: [],
  isCommentsLoading: false,
  commentsError: '',
  isWritingComment: false,
  handleFetchComments: () => {},
  handleToggleWriteComment: () => {},
  handleAddComment: () => {},
  handleDeleteComment: () => {},
  handleSetLoading: () => {},
};

const CommentsContext = createContext(initialState);

type Action =
  | { type: 'comments/loaded'; payload: Comment[] }
  | { type: 'comments/rejected'; payload: string }
  | { type: 'comments/writeComment'; payload: boolean }
  | { type: 'comments/addComment'; payload: Comment }
  | { type: 'comments/deleteComment'; payload: number }
  | { type: 'comments/loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'comments/loading':
      return { ...state, isCommentsLoading: action.payload };

    case 'comments/loaded':
      return { ...state, isCommentsLoading: false, comments: action.payload };

    case 'comments/writeComment':
      return { ...state, isWritingComment: action.payload };

    case 'comments/addComment':
      return { ...state, comments: [...state.comments, action.payload] };

    case 'comments/deleteComment':
      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== action.payload),
      };

    case 'comments/rejected':
      return {
        ...state,
        isCommentsLoading: false,
        commentsError: action.payload,
      };
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
    dispatch({ type: 'comments/loading', payload: true });
    try {
      const fetchedComments = await getComments(postId);

      dispatch({ type: 'comments/loaded', payload: fetchedComments });
    } catch {
      dispatch({
        type: 'comments/rejected',
        payload: 'Something went wrong',
      });
    } finally {
      dispatch({ type: 'comments/loading', payload: false });
    }
  };

  const handleAddComment = (comment: Comment) => {
    dispatch({ type: 'comments/addComment', payload: comment });
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch({ type: 'comments/deleteComment', payload: commentId });
  };

  const handleSetLoading = (value: boolean) => {
    dispatch({ type: 'comments/loading', payload: value });
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
        handleAddComment,
        handleDeleteComment,
        handleSetLoading,
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
