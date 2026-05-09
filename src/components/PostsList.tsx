import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  onPostSelect: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onPostSelect,
}) => (
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
          <tr key={post.id} data-cy="Post">
            <td data-cy="PostId">{post.id}</td>
            <td data-cy="PostTitle">{post.title}</td>
            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button', 'is-link', {
                  'is-light': selectedPost?.id !== post.id,
                })}
                onClick={() => onPostSelect(post)}
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

const postShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostsList.propTypes = {
  posts: PropTypes.arrayOf(postShape.isRequired).isRequired,
  selectedPost: postShape,
  onPostSelect: PropTypes.func.isRequired,
};
