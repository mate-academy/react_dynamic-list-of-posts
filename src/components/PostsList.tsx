import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onTogglePost: (post: Post) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onTogglePost,
}) => {
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
            const { id, title } = post;
            const isOpen = selectedPost?.id === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button ${isOpen ? 'is-link' : 'is-link is-light'}`}
                    onClick={() => onTogglePost(post)}
                  >
                    {isOpen ? 'Close' : 'Open'}
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

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }),
  onTogglePost: PropTypes.func.isRequired,
};
