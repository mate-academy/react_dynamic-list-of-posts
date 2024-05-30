import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  posts: Post[];
  chosenPost: Post | null;
  handlePostChange: (newPost: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  chosenPost,
  handlePostChange,
}) => (
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
        {posts.map((currentPost: Post) => (
          <tr key={currentPost.id} data-cy="Post">
            <td data-cy="PostId">{currentPost.id}</td>

            <td data-cy="PostTitle">{currentPost.title}</td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames('button', 'is-link', {
                  'is-light': chosenPost !== currentPost,
                })}
                onClick={() => {
                  if (chosenPost && chosenPost === currentPost) {
                    handlePostChange(null);
                  } else {
                    handlePostChange(currentPost);
                  }
                }}
              >
                {currentPost !== chosenPost ? 'Open' : 'Close'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
