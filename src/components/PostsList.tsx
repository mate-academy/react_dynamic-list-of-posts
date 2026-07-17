import React, { useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface PostListProps {
  posts: Post[];
  selectedPost: (postId: number) => void;
}

export const PostsList = ({ posts, selectedPost }: PostListProps) => {
  const [buttonClickId, setButtonClickId] = useState(0);

  const handleSubmit = (postId: number) => {
    if (postId === buttonClickId) {
      setButtonClickId(0);
      selectedPost(0);

      return;
    }

    setButtonClickId(postId);
    selectedPost(postId);
  };

  return posts.length > 0 ? (
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
                  className={classNames(
                    `button is-link ${buttonClickId === post.id ? '' : 'is-light'}`,
                  )}
                  onClick={() => {
                    handleSubmit(post.id);
                  }}
                >
                  {buttonClickId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  );
};
