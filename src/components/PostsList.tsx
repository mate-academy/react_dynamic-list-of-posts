import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { getPosts } from '../api/posts';

import { Post } from '../types/Post';
import { User } from '../types/User';
import { Loader } from './Loader';

type Props = {
  selectedUser: User,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectedPost,
  setSelectedPost,
}) => {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingError, setIsProcessingError] = useState(false);
  const toggleOpenerSidebar = (post: Post | null) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    const getUsersPostList = async () => {
      try {
        if (selectedUser) {
          const posts = await getPosts(selectedUser.id);

          setPostsList(posts);
        }
      } catch {
        setIsProcessingError(true);
      } finally {
        setIsLoading(false);
        setIsProcessingError(false);
      }
    };

    getUsersPostList();
  }, [selectedUser]);

  if (isLoading) {
    return <Loader />;
  }

  if (isProcessingError) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!postsList.length) {
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
          {postsList.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
            >
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': selectedPost?.id !== post.id },
                  )}
                  onClick={() => {
                    toggleOpenerSidebar(
                      selectedPost?.id === post.id ? null : post,
                    );
                  }}
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
