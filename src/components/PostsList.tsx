import React, { useEffect } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post [],
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setIsCommentFormActive: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostsList: React.FC<Props> = React.memo(({
  posts,
  selectedPost,
  setSelectedPost,
  setIsCommentFormActive,
}) => {
  useEffect(() => {
    setIsCommentFormActive(false);
  }, [selectedPost]);

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

              {selectedPost && selectedPost?.id === post.id
                ? (
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
                )
                : (
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => setSelectedPost(post)}
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
});
