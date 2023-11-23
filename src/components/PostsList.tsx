import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  handlePost: (value: Post) => void;
  post: Post | null;
  handleNewComment: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts, handlePost, post, handleNewComment,
}) => {
  const buttonClass = (selectedPost: Post | null, renderingPost: Post) => cn(
    'button',
    'is-link',
    { 'is-light': selectedPost && selectedPost.id !== renderingPost.id },
  );

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
          {posts && posts
            .map(onePost => (
              <tr data-cy="Post" key={onePost.id}>
                <td data-cy="PostId">{onePost.id}</td>

                <td data-cy="PostTitle">
                  {onePost.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={buttonClass(post, onePost)}
                    onClick={() => {
                      handlePost(onePost);
                      handleNewComment(false);
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
