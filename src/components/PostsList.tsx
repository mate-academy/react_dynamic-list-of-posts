import React, { useState, useEffect } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

type PostsListProps = {
  selectedUserId: number | null;
  onPostSelect: (post: Post) => void;
};

export const PostsList: React.FC<PostsListProps> = ({
  selectedUserId,
  onPostSelect,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedUserId) {
      return;
    }

    setIsLoading(true);
    setError('');
    client
      .get(`/users/${selectedUserId}/posts`)
      .then(data => setPosts(data as Post[]))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  if (!selectedUserId) {
    return <p data-cy="NoSelectedUser">No user selected</p>;
  }

  if (isLoading) {
    return <p data-cy="Loader">Loading...</p>;
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        {error}
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => onPostSelect(post)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
