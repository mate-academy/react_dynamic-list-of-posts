import React from 'react';
import { Post } from '../types/Post';

interface PostListProps {
  posts: Post[];
  showComments: (arg: number) => void;
  selectedPostId: number | null;
  closeComments: () => void;
}

export const PostsList: React.FC<PostListProps> = ({
  posts,
  showComments,
  selectedPostId,
  closeComments,
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

              {post.id === selectedPostId ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={closeComments}
                  >
                    Close
                  </button>
                </td>
              ) : (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => showComments(post.id)}
                  >
                    Open
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
