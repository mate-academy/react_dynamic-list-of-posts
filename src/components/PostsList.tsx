import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  postsOfUser: Post[],
  loadComments: (postId: number) => void,
  currentPostId: number,
  isOpenPost: boolean,
};

export const PostsList: React.FC<Props> = ({
  postsOfUser,
  loadComments,
  currentPostId,
  isOpenPost,
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
        {postsOfUser.map(({ id, title }) => (
          <tr key={id} data-cy="Post">
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">
              {title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                onClick={() => loadComments(id)}
                type="button"
                data-cy="PostButton"
                className={classNames('button is-link', {
                  'is-light': currentPostId !== id,
                })}
              >
                {currentPostId === id && isOpenPost ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
