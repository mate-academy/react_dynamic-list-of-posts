import React, { useCallback, useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostDetails: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  onPostDetails,
}) => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);

  const handleOpenClick = useCallback((post: Post) => {
    setPostId(post.id);
    setIsPostOpen(true);
    onPostDetails(post);
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsPostOpen(false);
    onPostDetails(null);
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

        <tbody>
          {posts.map((post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {(isPostOpen && post.id === postId) ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleCloseClick()}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleOpenClick(post)}
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
