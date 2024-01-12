import React, { useState } from 'react';
import { usePostContext } from '../context/PostProvider';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts, selectedPost, setSelectedPost, setIsEdit,
  } = usePostContext();
  const [open, setOpen] = useState<number>(-1);

  const handleOpenPost = (post: Post) => {
    if (selectedPost !== post) {
      setIsEdit(false);
      setSelectedPost(post);
      setOpen(post.id);
    } else {
      setOpen(-1);
      setSelectedPost(null);
    }
  };

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

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {open !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleOpenPost(post)}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleOpenPost(post)}
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
