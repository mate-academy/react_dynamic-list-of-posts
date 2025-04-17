import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostSelect: (post: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelect,
  selectedPost,
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

              <td data-cy="PostTitle">{post.title} </td>

              <td className="has-text-right is-vcentered">
                {isSelected ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => onPostSelect(null)}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => onPostSelect(post)}
                  >
                    Open
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
