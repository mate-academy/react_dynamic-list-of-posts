import React from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  setSelectedPost: (value: Post | null) => void;
  selectedPost: Post | null;
  setIsWritingComment: (value: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  setSelectedPost,
  selectedPost,
  setIsWritingComment,
}) => (
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
        {userPosts.map(post => (
          <tr data-cy="Post" key={post.id}>
            <td data-cy="PostId">{post.id}</td>

            <td data-cy="PostTitle">{post.title}</td>

            <td className="has-text-right is-vcentered">
              {selectedPost?.id === post.id ? (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link"
                  onClick={() => {
                    setSelectedPost(null);
                    setIsWritingComment(false);
                  }}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => {
                    setSelectedPost(post);
                    setIsWritingComment(false);
                  }}
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
