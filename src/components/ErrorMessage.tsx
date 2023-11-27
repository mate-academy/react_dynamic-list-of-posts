/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ErrorType } from '../types/ErrorType';

type Props = {
  errorType: ErrorType
};

export const ErrorMessage: React.FC<Props> = ({ errorType }) => {
  const data = () => {
    switch (errorType) {
      case ErrorType.POSTS:
        return 'PostsLoadingError';

      case ErrorType.COMMENTS:
        return 'CommentsError';

      case ErrorType.COMMENT_POST:
        return 'CommentPostError';

      case ErrorType.COMMENT_DELETE:
        return 'CommentDeleteError';

      default:
        return 'UsersLoadingError';
    }
  };

  return (
    <div
      className="notification is-danger"
      data-cy={data()}
    >
      {errorType}
    </div>
  );
};
