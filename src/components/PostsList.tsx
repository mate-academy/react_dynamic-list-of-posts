import React, { useState } from 'react';
import { Post } from '../types/Post';

type PostsListProps = {
  posts: Post[];
  openPost: (post: Post) => void;
  closePost: () => void;
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  openPost,
  closePost,
}) => {
  const [isButtonOpenedId, setIsButtonOpenedId] = useState(0);

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
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => {
                    if (isButtonOpenedId === post.id) {
                      setIsButtonOpenedId(0);
                      closePost();
                    } else {
                      openPost(post);
                      setIsButtonOpenedId(post.id);
                    }
                  }}
                >
                  {isButtonOpenedId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
