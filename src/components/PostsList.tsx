import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  currentUserPosts: Post[],
  activePost: Post | null,
  setActivePost(post: Post | null): void,
};

export const PostsList: React.FC<Props> = ({
  currentUserPosts,
  activePost,
  setActivePost,
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
          {currentUserPosts.map(post => (
            <tr
              data-cy="Post"
              key={post.id}
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
                    { 'is-light': post !== activePost },
                  )}
                  onClick={() => (
                    post !== activePost
                      ? setActivePost(post)
                      : setActivePost(null)
                  )}
                >
                  {activePost === post ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
