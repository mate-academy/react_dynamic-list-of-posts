import classNames from 'classnames';
import React from 'react';
import { usePostsContext } from '../hooks/usePostsContext';

export const PostsList: React.FC = () => {
  const { posts, selectedPost, handleSelectPost } = usePostsContext();

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
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handleSelectPost(post)}
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
