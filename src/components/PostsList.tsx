import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectPost: (id: number) => void;
  selectedPostID: number;
};

export const PostsList: React.FC<Props> = (props) => {
  const { posts, selectPost, selectedPostID } = props;

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
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {selectedPostID !== post.id
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => selectPost(post.id)}
                    >
                      Open
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => selectPost(0)}
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
