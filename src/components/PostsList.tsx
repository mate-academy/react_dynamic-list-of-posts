import React, { useContext } from 'react';
import { AppContext } from '../appContext';
import classNames from 'classnames';

export const PostsList: React.FC = () => {
  const context = useContext(AppContext);

  const {posts, setSelectedPost, selectedPost} = context;
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

          <td data-cy="PostTitle">
            {post.title}
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className={classNames('button is-link', {
                'is-light': selectedPost?.id === post.id,
              })}
              onClick={() => setSelectedPost(post)}
            >
              {selectedPost?.id == post.id ? 'Close' : 'Open'}
            </button>
          </td>
        </tr>
          ))
        }
    </tbody>
    </table>
  </div>
  );
}

