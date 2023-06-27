import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onSelectedPost: (post: number) => void,
  postId: number,
};

export const PostItem: React.FC<Props> = ({
  posts,
  onSelectedPost,
  postId,
}) => {
  return (
    <tbody>
      {posts.map((post: Post) => (
        <tr
          data-cy="Post"
          key={post.id}
        >
          <td data-cy="PostId">
            {post.id}
          </td>

          <td data-cy="PostTitle">
            {post.title}
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className={classNames('button is-link', {
                'is-light': (post.id !== postId),
              })}
              onClick={() => {
                onSelectedPost(post.id);
              }}
            >
              {(post.id !== postId) ? (
                'Open'
              ) : (
                'Close'
              )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
