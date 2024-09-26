import React, { useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onOpen: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onOpen }) => {
  const [openedPost, setOpendPost] = useState<Post | null>(null);

  const handleClick = (post: Post) => {
    if (post.id === openedPost?.id) {
      setOpendPost(null);
      onOpen(null);
    } else {
      setOpendPost(post);
      onOpen(post);
    }
  };

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
          {posts.map(post => {
            const isOppened = openedPost?.id === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isOppened,
                    })}
                    onClick={() => handleClick(post)}
                  >
                    {isOppened ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
