import { ErrorText } from '../../types/ErrorText';

type Props = {
  errorMessage: ErrorText;
};

export const PostsError: React.FC<Props> = ({ errorMessage }) => {
  switch (errorMessage) {
    case ErrorText.failLoad:
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );

    case ErrorText.noPosts:
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    default:
      return null;
  }
};
