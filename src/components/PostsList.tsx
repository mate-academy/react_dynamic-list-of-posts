/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';

interface Props {
  userId: number;
  onOpen: (post: Post) => void;
}

export const PostsList: React.FC<Props> = ({ userId, onOpen }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await client.get<Post[]>(`/posts?userId=${userId}`);

        setPosts(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  const handlePostSelect = (post: Post) => {
    onOpen(post);
  };

  return (
    <>
      {error ? (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      ) : posts.length === 0 ? (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      ) : (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table className="table is-fullwidth is-striped is-hoverable is-narrow">
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {posts.map(post => (
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">{post.title}</td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => handlePostSelect(post)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
