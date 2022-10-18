import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostsByUserId } from '../api/posts';
import { Loader } from './Loader';
import { PostPreview } from './PostPreview';

interface Props {
  selectedUser: number | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPost: number | null,
}

export const PostsList: FC<Props> = ({
  selectedUser,
  setSelectedPost,
  selectedPost,
}) => {
  const {
    isLoading,
    isError,
    data: posts,
  } = useQuery(['posts', selectedUser], () => getPostsByUserId(selectedUser!), {
    enabled: !!selectedUser,
  });

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      {isLoading && <Loader />}
      {isError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {(posts && !!posts.length && !isLoading) ? (
        <table
          className="table is-fullwidth is-striped is-hoverable is-narrow"
        >
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th />
            </tr>
          </thead>

          <tbody>
            {posts
              .map((post) => (
                <PostPreview
                  post={post}
                  key={post.id}
                  setSelectedPost={setSelectedPost}
                  selectedPost={selectedPost}
                />
              ))}
          </tbody>
        </table>
      ) : (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
    </div>
  );
};
