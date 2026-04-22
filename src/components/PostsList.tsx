import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onOpenPostDetails: (post: Post) => void;
  onClosePostDetails: () => void;
  activePost: Post | null;
};

const PostsListBase: React.FC<Props> = ({
  posts,
  onOpenPostDetails,
  onClosePostDetails,
  activePost,
}) => {
  const handleOpenPostDetails = (post: Post) => {
    onOpenPostDetails(post);
  };

  const handleClosePostDetails = () => {
    onClosePostDetails();
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
            const isPostActive = activePost?.id === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': !isPostActive,
                    })}
                    onClick={() => {
                      if (isPostActive) {
                        handleClosePostDetails();
                      } else {
                        handleOpenPostDetails(post);
                      }
                    }}
                  >
                    {isPostActive ? 'Close' : 'Open'}
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

export const PostsList = React.memo(PostsListBase);
