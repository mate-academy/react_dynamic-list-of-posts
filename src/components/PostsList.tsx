import cn from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null
  posts: Post[]
  onPostOpen: (post: Post | null) => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostOpen,
  selectedPost,
}) => {
  const postOpenHandler = (post: Post | null) => {
    if (selectedPost === post) {
      onPostOpen(null);

      return;
    }

    onPostOpen(post);
  };

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

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  onClick={() => {
                    postOpenHandler(post);
                  }}
                  data-cy="PostButton"
                  className={cn(
                    'button is-link',
                    { 'is-light': selectedPost !== post },
                  )}
                >
                  {selectedPost === post
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
