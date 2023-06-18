import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPostId?: number;
  selectPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPostId,
  selectPost,
}) => {
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
          {posts.map((post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">
                {post.id}
              </td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {post.id === selectedPostId
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => selectPost(null)}
                    >
                      Close
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => selectPost(post)}
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
});
