import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPostSelect: (value: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onPostSelect }) => {
  const [activePost, setActivePost] = useState(-1);

  const handleSelectedPost = (id: number) => {
    onPostSelect(id);
    setActivePost(id);
  };

  const handleClose = () => {
    setActivePost(-1);
    onPostSelect(-1);
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

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                {activePost === post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleSelectedPost(post.id)}
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
