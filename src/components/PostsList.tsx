import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostSelect: (post: Post) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelect,
  selectedPost,
}) => {
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
              className={post.id === selectedPost?.id ? 'is-selected' : ''}
            >
              <td data-cy="PostId">{post.id}</td>
              <td
                data-cy="PostTitle"
                onClick={() => onPostSelect(post)}
                style={{ cursor: 'pointer' }}
              >
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                {selectedPost?.id === post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => onPostSelect(post)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};
