import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectedPostId: number | undefined,
  setSelectedPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts, selectedPostId = 0, setSelectedPost,
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
        {posts.map(post => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.title}</td>

            <td data-cy="PostTitle">
              {post.body}
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className={classNames(
                  'button is-link',
                  { 'is-light': post?.id !== selectedPostId },
                )}
                onClick={() => setSelectedPost(post.id !== selectedPostId
                  ? post
                  : null)}
              >
                {post.id !== selectedPostId ? 'Open' : 'Close'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
