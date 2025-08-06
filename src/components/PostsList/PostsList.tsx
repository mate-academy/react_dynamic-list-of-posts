import React from 'react';
import { Post } from '../../types/Post';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import classNames from 'classnames';
import { ErrorMessage } from '../../constants/ErrorMessage';
import { Loader } from '../Loader';

interface Props {
  posts: Post[];
  selectedPostId: number | null;
  selectedUser: number | null;
  setSelectedPostId: (postId: number | null) => void;
  loading: boolean;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  selectedUser,
  setSelectedPostId,
  loading,
}) => {
  const visiblePosts = posts.filter(post => post.userId === selectedUser);

  if (!selectedUser) {
    return null;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {visiblePosts.length > 0 ? (
            visiblePosts.map(post => (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': selectedPostId !== post.id,
                    })}
                    onClick={() =>
                      setSelectedPostId(
                        selectedPostId === post.id ? null : post.id,
                      )
                    }
                  >
                    {selectedPostId === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>
                <ErrorNotification
                  type="warning"
                  message={ErrorMessage.NO_POST_FOR_USER}
                  dataCy="NoPostsYet"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {loading && <Loader />}
    </div>
  );
};
