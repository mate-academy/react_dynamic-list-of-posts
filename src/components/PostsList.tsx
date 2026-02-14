import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Post } from '../types/Post';

interface Props {
  selectedPostId: number | null;
  postsList: Post[];
  onPostSelect: (id: number | null) => void;
}

export const PostsList: React.FC<Props> = ({
  postsList,
  onPostSelect,
  selectedPostId,
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
        {postsList.map(post => {
          const isSelected = post.id === selectedPostId;

          return (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', {
                    'is-link': isSelected,
                    'is-light': !isSelected,
                  })}
                  onClick={() => {
                    onPostSelect(isSelected ? null : post.id);
                  }}
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
  selectedPostId: PropTypes.number,
  onPostSelect: PropTypes.func.isRequired,
  postsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
