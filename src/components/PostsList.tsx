import React, { useState } from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[],
  selectPost: (post: Post | null) => void,
  selectedPost: Post | null,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  selectedPost,
}) => {
  const [isPostSelected, setIsPostSelected] = useState(false);

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
              key={post.id}
              data-cy="Post"
            >
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
                      onClick={() => {
                        selectPost(null);
                      }}
                    >
                      Close
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => {
                        selectPost(post);
                        setIsPostSelected(!isPostSelected);
                      }}
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
