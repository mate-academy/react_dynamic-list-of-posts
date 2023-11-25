import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

type Props = {
  postsFromServer: Post[],
  onSelectedPost: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  postsFromServer,
  onSelectedPost,
  selectedPost,
}) => {

  const handleSelectedPost = (post: Post) => {
    if (selectedPost?.id !== post.id) {
      onSelectedPost(post);
    } else {
      onSelectedPost(null);
    }
  }

  return (
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
          {postsFromServer.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handleSelectedPost(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
