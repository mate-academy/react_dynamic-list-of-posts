import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { Loader } from './Loader';

type Props = {
  selectedUserId: number,
  selectedPost: Post | null,
  selectPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUserId,
  selectedPost,
  selectPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSelectPost = (postId: number) => {
    if (selectedPost?.id !== postId) {
      const openedPost = posts.find(post => post.id === postId) || null;

      selectPost(openedPost);
    } else {
      selectPost(null);
    }
  };

  useEffect(() => {
    const getUserPostsFromServer = async () => {
      try {
        selectPost(null);
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPost?.id !== post.id },
                  )}
                  onClick={() => handleSelectPost(post.id)}
                >
                  {selectedPost?.id === post.id
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
