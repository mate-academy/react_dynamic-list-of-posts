import React from 'react';
import { Post } from '../types/Post';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

type Props = {
  posts: Post[];
  selectedPostId: number | null;
  onSelect: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onSelect,
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
        {posts.map(post => (
          <tr
            key={post.id}
            data-cy="Post"
            className={
              selectedPostId === post.id ? 'has-background-link-light' : ''
            }
          >
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              <a
                href="#"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  onSelect(post.id);
                }}
              >
                {post.title}
              </a>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={`button is-link ${selectedPostId === post.id ? '' : 'is-light'}`}
                onClick={() => onSelect(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  selectedPostId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
} as unknown as React.WeakValidationMap<unknown>;
