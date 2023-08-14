import { FC } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useGlobalContext, usePostsContext } from '../../hooks';
import { Notification } from '../Notification';
import { NotificationType } from '../../types';
import { PostInfo } from './PostInfo';

export const PostList: FC = () => {
  const { error } = useGlobalContext();
  const { posts, isPostsLoading } = usePostsContext();

  const noPosts = !posts.length && !isPostsLoading;

  if (noPosts && error) {
    return (
      <Notification type={NotificationType.PostsError} />
    );
  }

  if (noPosts) {
    return (
      <Notification
        type={NotificationType.PostsWarning}
        warningText="No posts yet"
      />
    );
  }

  return (
    <>
      {isPostsLoading ? (
        <Loader />
      ) : (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table
            className={classNames(
              'table',
              'is-fullwidth',
              'is-striped',
              'is-hoverable',
              'is-narrow',
            )}
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <PostInfo post={post} key={post.id} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
