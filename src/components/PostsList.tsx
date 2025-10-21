import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  posts: Post[] | null;
  onTogglePost: (post: Post | null) => void;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onTogglePost,
  selectedPost,
}) => {
  const handlePostButtonToggle = (post: Post) => {
    const isSelected = selectedPost?.id === post.id;

    return !isSelected ? onTogglePost(post) : onTogglePost(null);
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
          {posts?.map(post => {
            const isSelected = selectedPost?.id === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button', 'is-link', {
                      'is-light': !isSelected,
                    })}
                    onClick={() => handlePostButtonToggle(post)}
                  >
                    {!isSelected ? 'Open' : 'Close'}
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

const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PostShape.isRequired),
  onTogglePost: PropTypes.func.isRequired,
  selectedPost: PostShape,
};
