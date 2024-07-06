import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  selectedUsersPosts: Post[];
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  selectedUsersPosts,
  setSelectedPost,
  selectedPost,
}) => {
  const handleSelectedUserPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
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
          {selectedUsersPosts.map(userPost => {
            const { id, title } = userPost;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => handleSelectedUserPost(userPost)}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
