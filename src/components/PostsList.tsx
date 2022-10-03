import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  // setShowPostsDetails: (value: boolean) => void
  // showPostsDetails: boolean
  postId: number
  setPostId: (value: number) => void
  fetchComments: (value: number) => void
  setShowForm: (value: boolean) => void
};

export const PostsList: React.FC<Props> = ({
  posts,
  // setShowPostsDetails,
  // showPostsDetails,
  postId,
  setPostId,
  fetchComments,
  setShowForm,
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
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                {postId === post.id
                  ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => {
                        // setShowPostsDetails(!showPostsDetails);
                        setPostId(0);
                        setShowForm(false);
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
                        // setShowPostsDetails(!showPostsDetails);
                        setPostId(post.id);
                        fetchComments(post.id);
                        setShowForm(false);
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
