import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onSetOpenPost: (selectedPost: Post | null) => void;
  openPost: Post | null;
};
export const PostsList: React.FC<Props> = ({
  posts,
  onSetOpenPost,
  openPost,
}) => {
  function handleOpenPost(post: Post) {
    if (openPost?.id === post.id) {
      onSetOpenPost(null);
    } else {
      onSetOpenPost(post);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': openPost?.id !== post.id,
                  })}
                  onClick={() => handleOpenPost(post)}
                >
                  {openPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
