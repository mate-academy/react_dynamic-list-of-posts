import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onPost: (data: Post) => void;
  selectedPost: Post | null;
  onSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPost,
  selectedPost,
  onSelectedPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th>.</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => {
            const isButtonOpen = selectedPost !== post;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  {isButtonOpen ? (
                    <button
                      onClick={() => onPost(post)}
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectedPost(null)}
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
