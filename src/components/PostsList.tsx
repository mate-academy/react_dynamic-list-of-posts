import classNames from 'classnames';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    userPosts,
    selectedPost,
    setSelectedPost,
  } = useContext(AppContext);

  const handlePostClick = (currentPost: Post) => {
    if (selectedPost && currentPost.id === selectedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(currentPost);
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
          {userPosts?.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': id !== selectedPost?.id,
                    })}
                    onClick={() => handlePostClick(post)}
                  >
                    {id !== selectedPost?.id ? 'Open' : 'Close'}
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
