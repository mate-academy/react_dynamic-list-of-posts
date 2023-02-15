import React from 'react';
import { Post } from '../types/Post';

type Props = {
  selectedUsersPosts: Post[],
  selectPost: (post: Post) => void,
  deSelectPost: () => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<Props> = ({
  selectedUsersPosts,
  selectPost,
  deSelectPost,
  selectedPost,
}) => (
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
        {selectedUsersPosts.map(post => (
          <tr data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              {selectedPost?.id === post.id
                ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={deSelectPost}
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
