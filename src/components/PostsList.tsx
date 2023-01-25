import React from 'react';
import cn from 'classnames';
import { Post } from '../types';

type Props = {
  posts: Post[]
  setSelectedPost: (post: Post | null) => void
  selectedPostId: number
  closeForm: () => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPostId = 0,
  setSelectedPost,
  closeForm,
}) => {
  const handlePost = (post: Post) => () => {
    setSelectedPost(selectedPostId === post.id ? null : post);
    closeForm();
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': selectedPostId !== post.id,
                  })}
                  onClick={handlePost(post)}
                >
                  {`${selectedPostId === post.id
                    ? 'Close'
                    : 'Open'}`}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
