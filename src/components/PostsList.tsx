import React from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onChoose: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onChoose,
  selectedPost,
}) => {
  const choosePost = (post: Post | null) => () => {
    onChoose(post);
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
          {posts.map(post => {
            const isSelected = (selectedPost?.id === post.id);

            return (
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
                      { 'is-light': !isSelected },
                    )}
                    onClick={choosePost(isSelected ? null : post)}
                  >
                    {isSelected ? 'Close' : 'Open'}
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
