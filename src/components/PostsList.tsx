import React, { Dispatch } from 'react';

import { Post } from '../types/Post';

interface Props {
  posts: Post[] | null;
  setSelectedPost: Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null;
  setIsAddingNewPost: Dispatch<React.SetStateAction<boolean>>;
}

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
  setIsAddingNewPost,
}) => {
  const handleSelectedPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);

    setIsAddingNewPost(false);
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
          {posts?.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title} </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${selectedPost?.id !== post.id && 'is-light'}`}
                  onClick={() => handleSelectedPost(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
