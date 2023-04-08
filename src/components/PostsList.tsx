import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  onOpenPost: (post: Post) => void,
  openedPost: Post,
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  onOpenPost,
  openedPost,
}) => {
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
          {userPosts.map((post) => {
            const { id, title } = post;
            const isOpenedPost = openedPost.id !== id;

            return (
              <tr
                key={id}
                data-cy="Post"
              >
                <td data-cy="PostId">{id}</td>
                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      { 'is-light': isOpenedPost },
                    )}
                    onClick={() => onOpenPost(post)}
                  >
                    {isOpenedPost
                      ? 'Open'
                      : 'Close'}
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
