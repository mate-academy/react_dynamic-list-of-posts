import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  posts: Post[];
  selectedPost?: Post | null;
  onSelectPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelectPost,
}) => {
  const handleButtonClick = (clickedPost: Post) => {
    if (selectedPost?.id === clickedPost.id) {
      onSelectPost(null);

      return;
    }

    onSelectPost(clickedPost);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.body}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handleButtonClick(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
