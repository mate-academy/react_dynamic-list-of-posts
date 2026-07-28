import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  const [selectedPostId, setSelectedPostId] = useState<Post | null>(null);

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
          {posts.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
              className={cn({
                'has-background-info': selectedPostId?.id === post.id,
              })}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button', 'is-link', {
                    ' is-light': selectedPostId?.id !== post.id,
                  })}
                  onClick={() =>
                    setSelectedPostId(
                      selectedPostId?.id === post.id ? null : post,
                    )
                  }
                >
                  {selectedPostId?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
