import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  userPosts: Post[];
  selectedPost: Post | null;
  onOpenComments: (id: number, post: Post) => Promise<void>;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  onOpenComments,
}) => (
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
        {userPosts.map(post => (
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                onClick={() => onOpenComments(post.id, post)}
                type="button"
                data-cy="PostButton"
                className={cn(
                  'button',
                  'is-link',
                  selectedPost?.id !== post.id && 'is-light',
                )}
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

PostsList.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  onOpenComments: PropTypes.func.isRequired,
};
