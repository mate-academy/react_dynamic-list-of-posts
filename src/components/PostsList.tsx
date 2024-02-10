import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  getPostId: (postId: number) => void
  openButton: (status: boolean) => void
  isOpen: boolean
  postId: number
  isFormActive: (status: boolean) => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  getPostId,
  openButton,
  isOpen,
  postId,
  isFormActive,
}) => {
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
          {posts.map(({ id, title }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button', 'is-link', 'is-light', {
                    hidden: (id === postId) && isOpen,
                  })}
                  onClick={() => {
                    if (id !== postId) {
                      isFormActive(false);
                    }

                    getPostId(id);
                    openButton(true);
                  }}
                >
                  Open
                </button>

                {(isOpen && (postId === id)) && (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => {
                      isFormActive(false);
                      getPostId(id);
                      openButton(false);
                    }}
                  >
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
