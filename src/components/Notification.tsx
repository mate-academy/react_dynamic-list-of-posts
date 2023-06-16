import classNames from 'classnames';
import { ErrorType } from '../types/ErrorType';

type Props = {
  errorType: ErrorType;
};

export const Notification: React.FC<Props> = ({ errorType }) => {
  const ErrorNoPosts = errorType === ErrorType.noPosts;

  const errorMessage = errorType === ErrorType.noPosts
    ? 'No posts yet'
    : 'Something went wrong!';

  return (
    <div
      className={classNames(
        'notification',
        { 'is-warning': ErrorNoPosts },
        { 'is-danger': !ErrorNoPosts },
      )}
      data-cy={classNames(
        { NoPostsYet: ErrorNoPosts },
        { PostsLoadingError: errorType === ErrorType.onPostsLoad },
        { CommentsError: errorType === ErrorType.onCommentsLoad },
      )}
    >
      {errorMessage}
    </div>
  );
};
