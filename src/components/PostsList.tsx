import React, { useContext } from 'react';
import { PostContext } from '../PostProvider';

export const PostsList: React.FC = () => {
  const { posts, setSelectedPost, selectedPost } = useContext(PostContext);

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
          {posts.map((post) => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  {selectedPost?.id !== id ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => setSelectedPost(post)}
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButtonCose"
                      className="button is-link"
                      onClick={() => setSelectedPost(null)}
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
