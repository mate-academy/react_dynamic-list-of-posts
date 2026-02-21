import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelect: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelect,
}) => {
  const handlePostClick = (post: Post) => {
    const nextPost = selectedPost?.id === post.id ? null : post;

    onSelect(nextPost);
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handlePostClick(post)}
                  data-cy="PostButton"
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
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired as PropTypes.Validator<Post[]>,
  selectedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }) as PropTypes.Validator<Post | null>,
  onSelect: PropTypes.func.isRequired,
};
