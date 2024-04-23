import React, { useContext } from 'react';
import { PostsAppContext } from './AppContext';
import classNames from 'classnames';

export const PostsList: React.FC = () => {
  const { userPosts, selectedPost, setSelectedPost, setIsCommentFormEnabled } =
    useContext(PostsAppContext);

  const handlePostSelect = (id: number) => {
    setIsCommentFormEnabled(false);

    const targetPost = userPosts.find(post => post.id === id);

    if (targetPost && targetPost !== selectedPost) {
      setSelectedPost(targetPost);
    }

    if (targetPost && targetPost === selectedPost) {
      setSelectedPost(null);
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
          {userPosts.map(post => {
            const { id, title } = post;
            const isSelected = () => {
              if (selectedPost) {
                return selectedPost.id === id;
              } else {
                return false;
              }
            };

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !isSelected(),
                    })}
                    onClick={() => handlePostSelect(id)}
                  >
                    {isSelected() ? 'Close' : 'Open'}
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
