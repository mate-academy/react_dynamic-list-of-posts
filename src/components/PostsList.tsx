import React, { useCallback } from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setIsNewCommentFormShown: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setIsNewCommentFormShown,
}) => {
  const handleClick = useCallback(
    (post: Post | null) => {
      setSelectedPost(post);
      setIsNewCommentFormShown(false);
    },
    [setSelectedPost, setIsNewCommentFormShown],
  );

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

              {post.id === selectedPost?.id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => setSelectedPost(null)}
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
                    onClick={() => handleClick(post)}
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
