import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
type Props = {
  postApi: Post[];
  selectedPostId: number | null;
  onOpenPost?: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = ({
  postApi,
  selectedPostId,
  onOpenPost,
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
          {postApi.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== selectedPostId,
                  })}
                  onClick={() =>
                    onOpenPost?.(post.id === selectedPostId ? null : post.id)
                  }
                >
                  {post.id === selectedPostId ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
