import React from 'react';
import { useAppContext } from '../context/store';
import cn from 'classnames';
import { Notification } from './Notification';
import { Warning } from '../types/Notification';

export const PostsList: React.FC = () => {
  const {
    state: { posts, selectedPost },
    methods: { setSelectedPost },
  } = useAppContext();

  if (!posts.length) {
    return <Notification type="warning" message={Warning.NoPost} />;
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

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button', 'is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() =>
                    setSelectedPost(selectedPost?.id === post.id ? null : post)
                  }
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
