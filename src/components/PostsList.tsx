import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
type Props = {
  posts?: Post[];
  activePost: Post | null;
  choosePost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  activePost,
  choosePost,
}) => {
  function handleClickToChoosePost(post: Post) {
    if (!activePost) {
      choosePost(post);
    }

    if (activePost?.id === post.id) {
      choosePost(null);
    }

    if (activePost?.id !== post.id) {
      choosePost(post);
    }
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {posts?.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': activePost?.id !== post.id,
                  })}
                  onClick={() => handleClickToChoosePost(post)}
                >
                  {activePost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
