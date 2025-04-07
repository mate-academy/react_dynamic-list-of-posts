export const ErrorNotification = ({ errorType }) => {
  return (
    <>
      {errorType === 'Something went wrong!' && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {errorType}
        </div>
      )}

      {errorType === 'No posts yet' && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          {errorType}
        </div>
      )}
    </>
  );
};
