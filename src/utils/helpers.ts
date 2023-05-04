import { CommentData, CommentDataErrors } from '../types/Comment';

export const validateCommentData = (commentData: CommentData) => {
  const hasInputError: CommentDataErrors = {
    name: false,
    email: false,
    body: false,
  };

  Object.keys(commentData).forEach(key => {
    if (key === 'name' || key === 'email' || key === 'body') {
      if (!commentData[key].length) {
        hasInputError[key] = true;
      }
    }
  });

  return hasInputError;
};

export const checkInputsHaveErrors = (possibleErrors: CommentDataErrors) => {
  return Object.values(possibleErrors).includes(true);
};
