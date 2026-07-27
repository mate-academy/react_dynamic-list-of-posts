import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId?: number;
  onDelete: (postId: number) => void;
  onSelect: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  onDelete,
  onSelect,
  posts,
  selectedPostId,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
              className={cn({
                'has-background-info': selectedPostId === post.id,
              })}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => onSelect(post)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}

          {/* <tr data-cy="Post">
            <td data-cy="PostId">18</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
                onClick={() => onDelete(post.id)}
              >
                Close
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
