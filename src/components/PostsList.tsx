import classNames from 'classnames';
import React from 'react';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId: number;
  onPost: (postDetail: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId,
  onPost,
}) => {
  const onClickHandle = (post: Post) => {
    onPost(selectedPostId === post.id ? null : post);
  };

  return (
    <>
      {!posts.length
        ? (
          <div
            className="notification is-warning"
            data-cy="NoPostsYet"
          >
            No posts yet
          </div>
        )
        : (
          <div data-cy="PostsList">
            <p className="title">Posts:</p>

            <table
              className="table is-fullwidth is-striped is-hoverable is-narrow"
            >
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
                          { 'is-light': selectedPostId !== post.id },
                        )}
                        onClick={() => onClickHandle(post)}
                      >
                        {selectedPostId === post.id
                          ? 'Close'
                          : 'Open'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
};
