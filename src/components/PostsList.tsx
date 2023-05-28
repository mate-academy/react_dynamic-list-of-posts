import React, { useCallback, useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  handleSelectPost: (value: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  handleSelectPost,
  selectedPost,
}) => {
  const [isPost, setIsPost] = useState(false);
  const handleOpenPost = useCallback((post: Post | null) => {
    if (!post?.id) {
      setIsPost(false);

      return handleSelectPost(null);
    }

    setIsPost(true);

    return handleSelectPost(post);
  }, []);

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
        {posts.map(post => (
          <tbody key={post.id}>
            <tr data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>
              {(isPost && selectedPost?.id === post.id) ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleOpenPost(null)}
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
                    onClick={() => handleOpenPost(post)}
                  >
                    Open
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        ))}

      </table>
    </div>
  );
});
