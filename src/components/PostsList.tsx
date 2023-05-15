import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  selectedPost: Post | undefined,
  setSelectedPost: (cb: () => Post | undefined) => void,
  setIsNewCommentForm: (value: boolean) => void,
  setIsCommentsError: (value: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
  setIsNewCommentForm,
  setIsCommentsError,
}) => {
  const onPostOpen = (post: Post) => {
    setIsCommentsError(false);
    setIsNewCommentForm(false);
    setSelectedPost(() => {
      return selectedPost?.id === post.id ? undefined : post;
    });
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
                    { 'is-light': selectedPost?.id !== post.id },
                  )}
                  onClick={() => onPostOpen(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
