import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onSelectedPostId: (selectedPostId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectedPostId,
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
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                {selectedPostId !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => onSelectedPostId(post.id)}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => onSelectedPostId(-1)}
                  >
                    Close
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
