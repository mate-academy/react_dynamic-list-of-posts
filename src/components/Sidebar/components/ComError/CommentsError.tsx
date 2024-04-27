import React from 'react';
import { ErrorText } from '../../../../types/ErrorText';

type Props = {
  errorText: ErrorText;
};

export const CommentsError: React.FC<Props> = React.memo(({ errorText }) => {
  switch (errorText) {
    case ErrorText.failLoad:
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          {ErrorText.failLoad}
        </div>
      );

    case ErrorText.noComments:
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          {ErrorText.noComments}
        </p>
      );
    default:
      return;
  }
});
CommentsError.displayName = 'CommentsError';
