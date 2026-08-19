import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPostId: number;
  onSelectPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelectPost,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th className="has-text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => {
          const isSelected = post.id === selectedPostId;

          return (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': !isSelected,
                  })}
                  onClick={() => onSelectPost(isSelected ? null : post)}
                >
                  {isSelected ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPostId: PropTypes.number.isRequired,
  onSelectPost: PropTypes.func.isRequired,
};
