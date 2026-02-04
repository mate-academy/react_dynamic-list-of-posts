import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[] | null;
  onPostSelect: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null;
}
interface TableHeaderProps {
  length: number;
}

const TableHeader: React.FC<TableHeaderProps> = ({ length }) => {
  const code = !length ? (
    <div className="notification is-warning" data-cy="NoPostsYet">
      No posts yet
    </div>
  ) : (
    <thead>
      <tr className="has-background-link-light">
        <th>#</th>
        <th>Title</th>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <th> </th>
      </tr>
    </thead>
  );

  return code;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostSelect,
  selectedPost,
  // error,
}) => {
  const onClick = (post: Post) => {
    onPostSelect(cur => {
      if (cur?.id === post.id) {
        return null;
      }

      return post;
    });
  };

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <TableHeader length={posts?.length || 0} />

        <tbody>
          {posts?.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => onClick(post)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
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
