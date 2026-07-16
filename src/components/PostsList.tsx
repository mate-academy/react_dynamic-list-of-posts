import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

interface Props {
  selectedUserId: number;
  selectedPost: Post | null;
  onPostSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPost,
  onPostSelect,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    onPostSelect(null);
    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(postsFromServer => {
        setPosts(postsFromServer);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [onPostSelect, selectedUserId]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && hasError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}
      {!isLoading && !hasError && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}
      {!isLoading && !hasError && posts.length > 0 && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>
          {/* eslint-disable-next-line max-len */}
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
                    {selectedPost?.id === post.id ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => onPostSelect(null)}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => onPostSelect(post)}
                      >
                        Open
                      </button>
                    )}
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
