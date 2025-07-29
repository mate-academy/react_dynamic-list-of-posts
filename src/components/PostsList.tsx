import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { getPosts } from '../api/posts';
import { Loader } from './Loader';

type Props = {
  selectedUser: User | null;
  setErrorMessage: (msg: string) => void;
  handleSidebar: (post: Post | null) => void;
  activePost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  setErrorMessage,
  handleSidebar,
  activePost,
}) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedUser) {
      setUserPosts([]);

      return;
    }

    setIsLoading(true);

    getPosts(selectedUser.id)
      .then(setUserPosts)
      .catch(() => {
        setErrorMessage('Unable to load posts');
      })
      .finally(() => setIsLoading(false));
  }, [selectedUser, setErrorMessage]);

  const handleToggleSidebar = (post: Post) => {
    handleSidebar(post);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : userPosts.length === 0 ? (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      ) : (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          {/* eslint-disable-next-line max-len */}
          <table className="table is-fullwidth is-striped is-hoverable is-narrow">
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {userPosts.map(post => (
                <tr key={post.id} data-cy="Post">
                  <td data-cy="PostId">{post.id}</td>
                  <td data-cy="PostTitle">{post.title}</td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={`button is-link ${activePost?.id === post.id ? '' : 'is-light'}`}
                      onClick={() => handleToggleSidebar(post)}
                    >
                      {activePost?.id === post.id ? 'Close' : 'Open'}
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
