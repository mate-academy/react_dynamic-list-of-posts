import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  postsOfUser: Post[],
  loadComments: (postId: number) => void,
  currentPostId: number,
};

export const PostsList: React.FC<Props> = ({
  postsOfUser,
  loadComments,
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
        {postsOfUser.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                onClick={() => loadComments(post.id)}
                type="button"
                data-cy="PostButton"
                className={classNames('button is-link', {
                  'is-light': currentPostId !== post.id,
                })}
              >
                {currentPostId === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
