import React from 'react';
import { Post } from '../types/Post';

type ListOfPosts = {
  posts: Post[],
  onSelectPost: (post: Post | null) => void,
  selectedPost: Post | null,
};

export const PostsList: React.FC<ListOfPosts> = ({
  posts,
  onSelectPost,
  selectedPost,
}) => {
  const handleOpenPost = (post: Post) => {
    onSelectPost(post);
  };

  const handleClosePost = () => {
    onSelectPost(null);
  };

  return (
    <>
      {posts.length > 0 && (
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
              {posts.map(post => (
                <tr data-cy="Post" key={post.id}>
                  <td data-cy="PostId">{post.id}</td>

                  <td data-cy="PostTitle">
                    {post.title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    {selectedPost?.id === post.id ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link"
                        onClick={handleClosePost}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => handleOpenPost(post)}
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
      )}
    </>
  );
};
