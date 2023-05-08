import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  handleOnPostClick: (id: number, title: string, body: string) => void;
  currentPostId?: number;
}

export const PostsList: React.FC<Props>
  = ({
    posts,
    handleOnPostClick,
    currentPostId,
  }) => (
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
          {posts.map(({ id, title, body }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link',
                    { 'is-light': currentPostId !== id })}
                  onClick={() => handleOnPostClick(id, title, body)}
                >
                  {currentPostId === id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
