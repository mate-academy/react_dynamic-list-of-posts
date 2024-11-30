import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  selectedPost: Post | null;
  setShowForm: (value: boolean) => void;
  setSelectedPost: (postId: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  setShowForm,
  setSelectedPost,
}) => {
  const openPostFunction = (postToSelect: Post) => {
    if (selectedPost && selectedPost.id === postToSelect.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(postToSelect);
      setShowForm(false);
    }
  };

  const isOpenFunction = (currentPost: Post) => {
    if (selectedPost && selectedPost.id === currentPost.id) {
      return true;
    } else {
      return false;
    }
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
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  onClick={() => openPostFunction(post)}
                  className={classNames('button is-link', {
                    'is-light': !isOpenFunction(post),
                  })}
                >
                  {isOpenFunction(post) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
