import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  handleSelectPost: (value: Post) => void;
  // selectId: Post | null
};

export const PostsList: React.FC<Props> = ({
  posts,
  handleSelectPost,
  // selectId,
}) => {
  const [open, setOpen] = useState<number | null>(null);
  const handleOpenPost = (post: Post) => {
    if (open === post.id) {
      setOpen(null);
    } else {
      setOpen(post.id);
    }

    handleSelectPost(post);
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
        {posts.map(post => (
          <tbody key={post.id}>
            <tr data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>
              {open === post.id ? (
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleOpenPost(post)}
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
};
