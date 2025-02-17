import React, { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Loader } from './Loader';

interface PostsListProps {
  userId: number;
  selectedPost: Post | null;
  onPostSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  userId,
  selectedPost,
  onPostSelect,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await client.get<Post[]>(`/posts?userId=${userId}`);

        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (loading) {
    return <Loader />;
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
          {posts.map(post => {
            const isSelected =
              selectedPost && Number(selectedPost.id) === Number(post.id);

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link ${isSelected ? '' : 'is-light'}`}
                    onClick={() => {
                      if (isSelected) {
                        onPostSelect(null);
                      } else {
                        onPostSelect(post);
                      }
                    }}
                  >
                    {isSelected ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
