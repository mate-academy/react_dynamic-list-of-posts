import React from 'react';
import { Errors } from '../types/Errors';

type Props = {
  error: Errors;
};

export const ErrorNotification: React.FC<Props> = React.memo(({ error }) => {
  let errorMessage = 'Something went wrong!';

  switch (error) {
    case Errors.PostsLoadingError:
      errorMessage = 'Can\'t load posts';
      break;

    case Errors.CommentsError:
      errorMessage = 'Can\'t load comments';
      break;

    default:
      break;
  }

  return (
    <div
      className="notification is-danger"
      data-cy={error}
    >
      {errorMessage}
    </div>
  );
});
