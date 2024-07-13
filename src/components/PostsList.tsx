import React, { useState } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type PostsListProps = {
  userPosts: Post[];
  onShowDetails: (postDetails: Post | null) => void;
};
export const PostsList: React.FC<PostsListProps> = ({
  userPosts,
  onShowDetails,
}) => {
  const [showDetailsPostId, setShowDetailsPostId] = useState<number | null>(
    null,
  );

  const handleShowDetails = (post: Post, isCurrentlyOpen: boolean) => {
    setShowDetailsPostId(isCurrentlyOpen ? null : post.id);
    onShowDetails(isCurrentlyOpen ? null : post);
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
          {userPosts.map(post => {
            const { id, title } = post;
            const isCurrentlyOpen = showDetailsPostId === id;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': !isCurrentlyOpen,
                    })}
                    onClick={() => handleShowDetails(post, isCurrentlyOpen)}
                  >
                    {isCurrentlyOpen ? 'Close' : 'Open'}
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
