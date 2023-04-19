import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  openedPostId: number | null,
  openPost: (postId: number | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  openedPostId,
  openPost,
}) => {
  const onClickPost = (postId: number, isOpenedModal: boolean) => {
    if (isOpenedModal) {
      openPost(null);
    } else {
      openPost(postId);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': openedPostId !== post.id },
                  )}
                  onClick={() => onClickPost(post.id, openedPostId === post.id)}
                >
                  {openedPostId === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
