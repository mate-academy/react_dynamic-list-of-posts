import React from 'react';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (value: Post | null) => void;
  setFormShowed: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setFormShowed,
}) => {
  const handleSelectPost = (post: Post) => () => {
    setSelectedPost(post);
    setFormShowed(false);
  };

  const handleReset = () => {
    setSelectedPost(null);
  };

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
          {posts.map(currentPost => (
            <tr data-cy="Post" key={currentPost.id}>
              <td data-cy="PostId">
                {currentPost.id}
              </td>

              <td data-cy="PostTitle">
                {currentPost.title}
              </td>

              <td className="has-text-right is-vcentered">
                {currentPost.id === selectedPost?.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={handleReset}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={handleSelectPost(currentPost)}
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
