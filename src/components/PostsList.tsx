import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onChange: (isOpen: boolean) => void;
  onSelect: (post: Post | null) => void;
  selectedPost: Post | null;
  onFormChange: (isOpen: boolean) => void;
};

export const PostsList: React.FC<Props> = React.memo(
  ({ posts, onChange, onSelect, selectedPost, onFormChange }) => {
    function handleCloseButton() {
      onChange(false);
      onSelect(null);
      onFormChange(false);
    }

    function handleOpenButton(post: Post) {
      onSelect(post);
      onChange(true);
      onFormChange(false);
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
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>
                {post.id === selectedPost?.id ? (
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-blue"
                      onClick={() => handleCloseButton()}
                    >
                      Close
                    </button>
                  </td>
                ) : (
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => handleOpenButton(post)}
                    >
                      Open
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

PostsList.displayName = 'PostList';
