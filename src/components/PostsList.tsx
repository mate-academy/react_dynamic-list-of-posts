import React, { useContext } from 'react';
import { AppContext } from '../context/context';
import { Post } from '../types/Post';
import classNames from 'classnames';

export const PostsList: React.FC = () => {
  const { posts, selectedPost, setSelectedPost, setIsOpenNewComment } =
    useContext(AppContext);

  const isOpen = (postId: number) => {
    return postId === selectedPost?.id;
  };

  const handleClick = (post: Post) => {
    const definedValue = isOpen(post.id) ? null : post;

    setIsOpenNewComment(false);
    setSelectedPost(definedValue);
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
          {posts.map(({ id, title, userId, body }: Post) => (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">{title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !isOpen(id),
                  })}
                  onClick={() => handleClick({ id, title, userId, body })}
                >
                  {isOpen(id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
