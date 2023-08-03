import React from 'react';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null;
  isWriting: boolean;
  setIsWriting: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
  isWriting,
  setIsWriting,
}) => {
  const handleClick = (post: Post | null) => {
    if (isWriting) {
      setIsWriting(false);
    }

    setSelectedPost(post);
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
          {posts.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>
                <td className="has-text-right is-vcentered">
                  {selectedPost?.id === id
                    ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={() => handleClick(null)}
                      >
                        Close
                      </button>
                    )
                    : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => handleClick(post)}
                      >
                        Open
                      </button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
