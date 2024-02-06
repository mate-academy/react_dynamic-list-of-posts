import classnames from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';

export const PostsList: React.FC = () => {
  const {
    userPosts,
    handleOpenPost,
    selectedPost,
  } = useContext(TodosContext);

  const userPostsLength = userPosts?.length;

  return (
    userPostsLength
      ? <div data-cy="PostsList">
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
            {userPosts?.map(post => (
              <tr data-cy="Post"
                key={post.id}
              >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classnames('button is-link', {
                    'is-light': post.id}
                  )}
                  onClick={() => handleOpenPost(post)}
                >
                  {selectedPost
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    : <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
  );
};
