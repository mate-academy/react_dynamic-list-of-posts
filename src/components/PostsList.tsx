import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  post: Post | null;
  setPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, post, setPost }) => {
  const handlerPostButton = (newCurrentPost: Post) => {
    if (newCurrentPost.id === post?.id) {
      setPost(null);
    } else {
      setPost(newCurrentPost);
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(currentPost => (
            <tr data-cy="Post" key={currentPost.id}>
              <td data-cy="PostId">{currentPost.id}</td>

              <td data-cy="PostTitle">{currentPost.title}</td>

              <td className="has-text-right is-vcentered">
                {post?.id === currentPost.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => handlerPostButton(post)}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => setPost(currentPost)}
                  >
                    Open
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
