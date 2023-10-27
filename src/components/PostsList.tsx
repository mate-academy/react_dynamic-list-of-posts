import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  postId: number,
  setPostId: (arg: number) => void,
  posts: Post[] | null,
};

export const PostsList: React.FC<Props> = ({
  postId, setPostId, posts,
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
          {posts?.map(post => (
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
                  className={classNames('button is-link', {
                    'is-light': postId !== post.id,
                  })}
                  onClick={() => {
                    if (postId === post.id) {
                      setPostId(0);
                    } else {
                      setPostId(post.id);
                    }
                  }}
                >
                  {postId !== post.id
                    ? 'Open'
                    : 'Close'}
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
