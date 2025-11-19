import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onOpenPost: (post: Post) => void;
  onClosePost: () => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onOpenPost,
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
        {posts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy={`PostId ${post.id}`}>{post.id}</td>
            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              {selectedPost?.id === post.id ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-danger is-light"
                  onClick={onClosePost}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => onOpenPost(post)}
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
