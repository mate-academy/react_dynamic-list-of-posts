import React from 'react';

type Props = {
  errorUsers?: boolean;
  errorPosts?: boolean;
  errorComments?: boolean;
  errorSubmit?: boolean;
  deleteError?: boolean;
};

export const ErrorNotification: React.FC<Props> = ({
  errorUsers = false,
  errorPosts = false,
  errorComments = false,
  errorSubmit = false,
  deleteError = false,
}) => {
  return (
    <>
      {errorUsers && (
        <div className="notification is-danger" data-cy="UserssLoadingError">
          Something went wrong!
        </div>
      )}
      {errorPosts && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}
      {errorComments && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
      {errorSubmit && (
        <div className="notification is-danger" data-cy="SubmitError">
          Something went wrong with add comments
        </div>
      )}
      {deleteError && (
        <div className="notification is-danger" data-cy="DeleteError">
          Something went wrong with delete comments
        </div>
      )}
    </>
  );
};
