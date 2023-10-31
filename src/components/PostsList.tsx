import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Prop = {
  posts: Post[] | null,
  handlePostSelect: (post: Post) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Prop> = React.memo(({
  posts,
  handlePostSelect,
  selectedPostId,
}) => (
  <div
    data-cy="PostsList"
  >
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
        {posts?.map(post => {
          const { id, title } = post;

          return (
            <tr key={id} data-cy="Post">
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn(
                    'button',
                    'is-link',
                    { 'is-light': selectedPostId === id },
                  )}
                  onClick={() => handlePostSelect(post)}
                >
                  {selectedPostId === id ? (
                    'close'
                  ) : (
                    'open'
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
));
