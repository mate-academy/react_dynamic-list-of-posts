import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  selectPost: Post | null
  setSelectPost: (selectPost: Post | null) => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  setSelectPost,
}) => {
  const handlerOpen = (post: Post) => {
    setSelectPost(selectPost === post ? null : post);
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
                  className={cn('button is-link',
                    { 'is-light': selectPost !== post })}
                  onClick={() => handlerOpen(post)}
                >
                  {selectPost === post ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
