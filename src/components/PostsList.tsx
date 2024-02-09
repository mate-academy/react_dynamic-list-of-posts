import React from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { posts, selectedPost } from '../signals/signals';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  useSignals();

  const handleSelectPost = (
    event: React.MouseEvent<HTMLButtonElement>,
    post: Post,
  ) => {
    event.preventDefault();
    selectedPost.value = post;
  };

  const handleClosePost = () => {
    selectedPost.value = null;
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.value.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {selectedPost.value?.id !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={e => handleSelectPost(e, post)}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={handleClosePost}
                  >
                    Close
                  </button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
