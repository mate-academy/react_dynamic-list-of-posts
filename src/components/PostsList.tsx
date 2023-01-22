import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  post: Post | null;
  setPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  post,
  setPost,
}) => (
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
        {posts.map(postFromList => (
          <tr key={postFromList.id} data-cy="Post">
            <td data-cy="PostId">{postFromList.id}</td>

            <td data-cy="PostTitle">
              {postFromList.title}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames(
                  'button',
                  'is-link',
                  { 'is-light': post?.id !== postFromList.id },
                )}
                onClick={() => (post?.id !== postFromList.id
                  ? setPost(post)
                  : setPost(null))}
              >
                {post?.id !== postFromList.id ? 'Open' : 'Close'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
