import React, { useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';

type Props = {
  selectedUsers: User | null;
  usersPosts: Post[];
  onPostCommentSelect: (postComment: Post, postId: number) => void;
  setOnClosedComments: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUsers,
  usersPosts,
  onPostCommentSelect,
  setOnClosedComments,
}) => {
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const toggleComments = (postId: number) => {
    setOpenPostId(prevPostId => (prevPostId === postId ? null : postId));
  };

  return (
    <div>
      {selectedUsers && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>
          <table
            className="table
            is-fullwidth
            is-striped
            is-hoverable
            is-narrow"
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {usersPosts.map((post, index) => (
                <tr key={index} data-cy="Post">
                  <td data-cy="PostId">{post.id}</td>
                  <td data-cy="PostTitle">{post.title}</td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={`button is-link ${openPostId === post.id ? '' : 'is-light'}`}
                      onClick={() => {
                        onPostCommentSelect(post, post.id);
                        toggleComments(post.id);
                        setOnClosedComments(openPostId !== post.id);
                      }}
                    >
                      {openPostId === post.id ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
