import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  setSelectedUserPost: (id: Post | null) => void;
  selectedUserPost: Post | null;
  setIsAddCommentFormActive: (state: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  setSelectedUserPost,
  selectedUserPost,
  setIsAddCommentFormActive,
}) => {
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
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedUserPost?.id !== post.id,
                  })}
                  onClick={() => {
                    if (post.id !== selectedUserPost?.id) {
                      setSelectedUserPost(post);
                    } else {
                      setSelectedUserPost(null);
                    }

                    setIsAddCommentFormActive(false);
                  }}
                >
                  {selectedUserPost?.id !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
