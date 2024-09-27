import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  openPostId: number | undefined;
  onClick: (post: Post) => void;
};

export const PostItem: React.FC<Props> = ({ posts, openPostId, onClick }) => {
  return (
    <>
      {posts.map(post => {
        const { id, title } = post;
        const isOppened = openPostId === id;

        return (
          <tr key={id} data-cy="Post">
            <td data-cy="PostId">{id}</td>

            <td data-cy="PostTitle">{title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button is-link', {
                  'is-light': !isOppened,
                })}
                onClick={() => onClick(post)}
              >
                {isOppened ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
