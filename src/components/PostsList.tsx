import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelect,
}) => {
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleClickingPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setIsPostOpen(!isPostOpen);
      onSelect(null);
    } else {
      onSelect(post);
      setIsPostOpen(true);
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

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                {selectedPost?.id !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => handleClickingPost(post)}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handleClickingPost(post)}
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
