import { useContext } from 'react';
import classNames from 'classnames';
import { PostsContext } from '../../PostsContext';
import { Error, Warning } from '../../types/Message';

export const Notification: React.FC = () => {
  const { notification } = useContext(PostsContext);

  return (
    <>
      <div
        data-cy={
          classNames(
            { PostsLoadingError: notification === Error.getPosts },
            { CommentsError: notification === Error.getComments },
            { NoPostsYet: notification === Warning.emptyPosts },
            { NoSelectedUser: notification === Warning.emptyUsers },
          )
        }
        className={
          classNames(
            { 'notification is-warning': notification === Warning.emptyPosts },
            {
              'notification is-danger':
                notification === Error.getPosts
                || notification === Error.getUsers
                || notification === Error.getComments,
            },
          )
        }
      >
        <p>{notification}</p>
      </div>
    </>
  );
};
