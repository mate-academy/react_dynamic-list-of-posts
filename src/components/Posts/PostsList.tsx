import { FC } from 'react';
import { PostItem } from './PostItem';
import { useUserStore } from '../../store/userStore';
import { usePosts } from '../../hooks/usePosts';
import { Loader } from '../Loader';

export const PostsList: FC = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const { data: posts, isLoading, isError } = usePosts(selectedUser?.id || 0);

  if (selectedUser === null) {
    return <p data-cy="NoSelectedUser">No user selected</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
