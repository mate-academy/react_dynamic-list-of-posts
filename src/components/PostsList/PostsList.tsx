import { FC } from 'react';
import cn from 'classnames';

import { Post } from '../../types';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  onSelectedPost: (post: Post | null) => void;
}

export const PostsList: FC<Props> = ({
  posts,
  selectedPost,
  onSelectedPost,
}) => {
  const handleToggleSelectPost = (post: Post) =>
    selectedPost === post ? onSelectedPost(null) : onSelectedPost(post);

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
            const { id, title } = post;
            const isSelectedCurrentPost = selectedPost?.id === id;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': !isSelectedCurrentPost,
                    })}
                    onClick={() => handleToggleSelectPost(post)}
                  >
                    {isSelectedCurrentPost ? 'Close' : 'Open'}
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
