import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type PostInfo = {
  data: Post[];
  activePost: number;
  onCurrentPost: (value: number) => void;
  isOpen?: boolean;
  onOpen: (value: boolean) => void;
  onVisibleWriteBtn: (value: boolean) => void;
};
export const PostsList: React.FC<PostInfo> = ({
  data,
  activePost,
  onCurrentPost,
  onOpen,
  onVisibleWriteBtn,
}) => {
  const handleBtn = (postId: number) => {
    if (activePost === postId) {
      onCurrentPost(0);
      onOpen(false);
    } else {
      onCurrentPost(postId);
      onOpen(true);
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
          {data.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link ', {
                    'is-light': activePost !== post.id,
                  })}
                  onClick={() => {
                    handleBtn(post.id);
                    onVisibleWriteBtn(true);
                  }}
                >
                  {activePost === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
