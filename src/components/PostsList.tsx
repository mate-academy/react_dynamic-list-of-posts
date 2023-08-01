import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
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
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {selectedPost?.id !== post.id
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames('button is-link', {
                        'is-light': selectedPost?.id !== post.id,
                      })}
                      onClick={() => setSelectedPost(post)}
                    >
                      Open
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => setSelectedPost(null)}
                    >
                      Close
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
