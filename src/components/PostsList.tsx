import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onSelectPost: (post: Post) => void;
  onClosePost: () => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelectPost,
  onClosePost,
}) => (
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
          const isSelected = selectedPost?.id === post.id;

          return (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button ${
                    isSelected ? 'is-link' : 'is-link is-light'
                  }`}
                  onClick={() =>
                    isSelected ? onClosePost() : onSelectPost(post)
                  }
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
