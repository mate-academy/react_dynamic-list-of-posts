import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { getPostsByUserId } from '../api/posts';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  selectedUser: User | null;
  onPostSelect: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ onPostSelect, selectedUser }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenPost = useCallback(
    (post: Post) => {
      if (selectedPost === post) {
        setSelectedPost(null);
        onPostSelect(null);
      } else {
        setSelectedPost(post);
        onPostSelect(post);
      }
    },
    [selectedPost, onPostSelect],
  );

  useEffect(() => {
    const loadPosts = async () => {
      if (!selectedUser?.id) {
        return;
      }

      setIsLoading(true);
      setError(false);

      try {
        const postsFromServer = await getPostsByUserId(selectedUser.id);

        setPosts(postsFromServer);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
    setSelectedPost(null);
    onPostSelect(null);
  }, [selectedUser, onPostSelect]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const { id, body } = post;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{body}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => handleOpenPost(post)}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
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
