import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  currentPostId?: number;
  setCurrentPost: (newCurrentPost: Post | null) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  currentPostId,
  setCurrentPost,
}) => {
  const handlerPostButton = (newCurrentPost: Post) => {
    if (newCurrentPost.id === currentPostId) {
      setCurrentPost(null);
    } else {
      setCurrentPost(newCurrentPost);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => {
            const { id, title } = post;
            const isOpen = id === currentPostId;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', { 'is-light': !isOpen })}
                    onClick={() => handlerPostButton(post)}
                  >
                    {isOpen ? 'Close' : 'Open'}
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
