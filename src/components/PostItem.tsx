import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onSelectedPost: (post: Post) => void,
  postId: number | null,
};

export const PostItem: React.FC<Props> = ({
  posts,
  onSelectedPost,
  postId,
}) => {
  return (
    <tbody>
      {posts.map((post: Post) => {
        const {
          id,
          title,
        } = post;

        return (
          <tr
            data-cy="Post"
            key={id}
          >
            <td data-cy="PostId">
              {id}
            </td>

            <td data-cy="PostTitle">
              {title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button is-link', {
                  'is-light': (post.id !== postId),
                })}
                onClick={() => onSelectedPost(post)}
              >
                {(post.id !== postId) ? (
                  'Open'
                ) : (
                  'Close'
                )}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
