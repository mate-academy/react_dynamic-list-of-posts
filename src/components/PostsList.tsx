import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  openPost?: Post | null,
  setPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  openPost = null,
  setPost,
}) => {
  const handleSetPost = (post: Post) => {
    if (openPost && openPost === post) {
      setPost(null);
    } else {
      setPost(post);
    }
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
          {posts.map((post: Post) => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': (!openPost || openPost.id !== id),
                    })}
                    onClick={() => handleSetPost(post)}
                  >
                    {openPost && openPost.id === id
                      ? 'Close'
                      : 'Open'}
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
