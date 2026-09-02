import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  selectPost: (postId: number) => void;
  selectedPostId: number | null;
  selectComments: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectPost,
  selectedPostId,
  selectComments,
}) => {
  return (
    <div data-cy="PostsList">
      {userPosts.length > 0 && <p className="title">Posts:</p>}

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        {userPosts.length > 0 && (
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th> </th>
            </tr>
          </thead>
        )}

        <tbody>
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPostId !== post.id,
                  })}
                  onClick={() => {
                    if (selectedPostId !== post.id) {
                      selectComments(post.id);
                    }

                    selectPost(post.id);
                  }}
                >
                  {selectedPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
