import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';

type Props = {
  selectedUserId: number;
  selectedPost: Post | null;
  onSelectPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPost,
  onSelectPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSelectPost = (postId: number) => {
    if (selectedPost?.id !== postId) {
      const openedPost = posts.find(post => post.id === postId) || null;

      onSelectPost(openedPost);
    } else {
      onSelectPost(null);
    }
  };

  useEffect(() => {
    const getUserPostsFromServer = async () => {
      try {
        onSelectPost(null);
        setIsLoading(true);
        setError(false);
        const postsFromServer = await getUserPosts(selectedUserId);

        setPosts(postsFromServer);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUserPostsFromServer();
  }, [selectedUserId]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!posts.length) {
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
          {posts.map(({ id, title }) => (
            <tr
              data-cy="Post"
              key={id}
            >
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPost?.id !== id },
                  )}
                  onClick={() => handleSelectPost(id)}
                >
                  {selectedPost?.id === id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
