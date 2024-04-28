import React, { useContext } from 'react';
import { ContextList } from './ListProvider/ListProvider';
import cn from 'classnames';

export const PostsList: React.FC = () => {
  const { postsList, selectPost, handleOpenPost } = useContext(ContextList);

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
          {postsList.map(post => (
            <React.Fragment key={post.id}>
              <tr data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': post.id !== selectPost?.id,
                    })}
                    onClick={() => handleOpenPost(post)}
                  >
                    {post.id !== selectPost?.id ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
