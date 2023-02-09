import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  openedPost: Post | null,
  setOpenedPost: (arg: Post | null) => void,
  setCommentsList: (arg: number) => void,
  setIsVisibleForm: (arg: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  openedPost,
  setOpenedPost,
  setCommentsList,
  setIsVisibleForm,
}) => (
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
        {posts?.map((post) => (
          <tr
            key={post.id}
            data-cy="Post"
          >
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">
              {post.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames(
                  'button is-link',
                  { 'is-light': openedPost?.id !== post.id },
                )}
                onClick={() => {
                  setOpenedPost(openedPost === post ? null : post);
                  setCommentsList(post.id);
                  setIsVisibleForm(false);
                }}
              >
                { openedPost?.id !== post.id
                  ? 'Open' : 'Close' }
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
);
