import React, { useEffect, useState } from 'react';
import { Post } from '../types';
import { getPostsByUserId } from '../api';
import { Loader } from './Loader';

type Props = {
  userId: number,
  selectedPost: Post | null,
  onSelect: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  userId,
  selectedPost,
  onSelect,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  const hasLoadedEmptyList = !posts.length && hasLoadedData;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const userPosts = await getPostsByUserId(userId);

        setHasLoadedData(true);
        setPosts(userPosts);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Unable to load posts!
      </div>
    );
  }

  if (hasLoadedEmptyList) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
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
            const { id, title } = post;
            const isSelected = post === selectedPost;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  {isSelected
                    ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => onSelect(null)}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => onSelect(post)}
                      >
                        Open
                      </button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
