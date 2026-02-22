import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  onChange: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onChange }: Props) => {
  const [openedPost, setOpenedPost] = useState<Post | null>(null);

  useEffect(() => {
    onChange(openedPost);
  }, [openedPost, onChange]);

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
          {posts.length > 0 &&
            posts.map(post => (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button',
                      'is-link',
                      openedPost?.id !== post.id && 'is-light',
                    )}
                    onClick={() =>
                      setOpenedPost(prev =>
                        prev?.id === post.id ? null : post,
                      )
                    }
                  >
                    {openedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
