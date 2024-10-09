import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import { getPostsByUserId } from '../api/posts';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  selectedUser: User | null;
  onPostSelect: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({ onPostSelect, selectedUser }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlePostOpen = (post: Post) => {
    setOpenPost(prevState => (prevState === post ? null : post));
    onPostSelect(post);
  };

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
  }, [selectedUser]);

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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.body}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': openPost?.id !== post.id,
                  })}
                  onClick={() => handlePostOpen(post)}
                >
                  {openPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
