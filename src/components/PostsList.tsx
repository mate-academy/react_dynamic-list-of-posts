import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
};

export const PostsList: React.FC<Props> = (
  {
    posts,
    selectedPost,
    setSelectedPost,
  },
) => {
  const handlePostButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    post: Post,
  ) => {
    event.preventDefault();
    setSelectedPost(post.id === selectedPost?.id ? null : post);
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
          {posts.length > 0 && (posts.map((post: Post) => {
            const chosen = selectedPost?.id !== post.id;

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
                    className={classNames('button is-link', {
                      'is-light': chosen,
                    })}
                    onClick={(event) => handlePostButton(event, post)}
                  >
                    {chosen ? 'Open' : 'Close'}
                  </button>
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </div>
  );
};
