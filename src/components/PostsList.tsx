import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  handleSelectedPost: (postId: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  handleSelectedPost,
  selectedPostId,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>
      <table
        className="table is-fullwidth is-striped is-hoverable is-narrow"
      >
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {post.id === selectedPostId
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => {
                        handleSelectedPost(0);
                      }}
                    >
                      Close
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => {
                        handleSelectedPost(post.id);
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
};
