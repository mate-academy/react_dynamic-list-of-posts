import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | undefined,
  selectedPost: Post | undefined,
  setSelectedPost(post: Post | undefined): void,
};

export const PostsList: React.FC<Props> = ({
  posts, selectedPost, setSelectedPost,
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
        {posts?.map((post) => {
          const isSelectedPost = post.id === selectedPost?.id;

          return (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': !isSelectedPost },
                  )}
                  onClick={() => {
                    setSelectedPost(!isSelectedPost ? post : undefined);
                  }}
                >
                  {!isSelectedPost ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
