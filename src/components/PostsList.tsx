import cn from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  postList: Post[];
  postSelect: Post | undefined;
  onPostSelect: (post: Post) => void;
  onPostClose: () => void;
};

export const PostsList: React.FC<Props> = ({
  postList,
  postSelect,
  onPostSelect,
  onPostClose,
}) => (
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
        {postList.map(post => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            {postSelect?.id === post.id ? (
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={onPostClose}
                >
                  Close
                </button>
              </td>
            ) : (
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': postSelect?.id !== post.id,
                  })}
                  onClick={() => onPostSelect(post)}
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
