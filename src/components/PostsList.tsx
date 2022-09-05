import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  onChoose: (post: Post) => void;
  selectedPostId: number | undefined;
}

export const PostsList: React.FC<Props> = ({
  posts,
  onChoose,
  selectedPostId,
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
        {posts.map(post => (
          <tr
            data-cy="Post"
            key={post.id}
          >
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              {selectedPostId !== post.id
                ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => onChoose(post)}
                  >
                    Open
                  </button>
                )
                : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => onChoose(post)}
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
