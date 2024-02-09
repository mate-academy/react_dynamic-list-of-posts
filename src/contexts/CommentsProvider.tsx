import React, { useMemo, useReducer } from 'react';
import { Comment } from '../types/Comment';
import * as api from '../api/comment';
import { CommentErrors } from '../types/CommentErrors';

interface Props {
  children: React.ReactNode,
}

interface State {
  comments: Comment[],
  errorMessage: string,
  isLoading: boolean,
}

type Action = {
  type: 'SetErrorMessage',
  errorMessage: string,
} | {
  type: 'SetIsLoading',
  isLoading: boolean,
} | {
  type: 'SetComments',
  comments: Comment[],
} | {
  type: 'DeleteComment',
  commentId: number,
} | {
  type: 'AddComment',
  comment: Comment,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SetErrorMessage': {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }

    case 'SetComments': {
      return {
        ...state,
        comments: action.comments,
      };
    }

    case 'SetIsLoading': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }

    case 'DeleteComment': {
      return {
        ...state,
        comments: state.comments.filter(({ id }) => id !== action.commentId),
      };
    }

    case 'AddComment': {
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    }

    default:
      return state;
  }
}

export const CommentsUpdateContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addComment: (_newComment: Omit<Comment, 'id'>) => (Promise.prototype),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setComments: (_comments: Comment[]) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadComments: (_postId: number) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteComment: (_commentId: number) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsLoading: (_isLoading: boolean) => { },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setErrorMessage: (_errorMessage: string) => { },
});

export const CommentsContext = React.createContext({
  comments: [] as Comment[],
  errorMessage: '',
  isLoading: false,
});

export const CommentsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    comments: [] as Comment[],
    errorMessage: '',
    isLoading: false,
  });

  function setErrorMessage(errorMessage: string) {
    dispatch({
      type: 'SetErrorMessage',
      errorMessage,
    });
  }

  function setIsLoading(isLoading: boolean) {
    dispatch({
      type: 'SetIsLoading',
      isLoading,
    });
  }

  function addComment(newComment: Omit<Comment, 'id'>) {
    return api.addComment(newComment)
      .then(comment => {
        dispatch({
          type: 'AddComment',
          comment,
        });
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function loadComments(postId: number) {
    setIsLoading(true);

    api.getPostComments(postId)
      .then((comments) => {
        dispatch({
          type: 'SetComments',
          comments,
        });
      })
      .catch(() => {
        setErrorMessage(CommentErrors.UnableToLoadComments);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function deleteComment(commentId: number) {
    dispatch({
      type: 'DeleteComment',
      commentId,
    });

    api.deleteComment(commentId)
      .then(() => {
        dispatch({
          type: 'SetErrorMessage',
          errorMessage: '',
        });
      })
      .catch(() => {
        dispatch({
          type: 'SetComments',
          comments: state.comments,
        });

        dispatch({
          type: 'SetErrorMessage',
          errorMessage: CommentErrors.UnableToDeleteComment,
        });
      });
  }

  function setComments(comments: Comment[]) {
    dispatch({
      type: 'SetComments',
      comments,
    });
  }

  const commentUpdateContextValue = useMemo(() => ({
    addComment,
    setComments,
    loadComments,
    deleteComment,
    setIsLoading,
    setErrorMessage,
  }), [deleteComment, loadComments]);

  const commentContextValue = useMemo(() => ({
    comments: state.comments,
    errorMessage: state.errorMessage,
    isLoading: state.isLoading,
  }), [state]);

  return (
    <CommentsUpdateContext.Provider value={commentUpdateContextValue}>
      <CommentsContext.Provider value={commentContextValue}>
        {children}
      </CommentsContext.Provider>
    </CommentsUpdateContext.Provider>
  );
};
