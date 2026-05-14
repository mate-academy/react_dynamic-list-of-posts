import { Post } from '../types/Post';
import React from 'react';
import { PostContext } from './PostContext';

export const PostsList: React.FC = () => {
  const { postList, post, setPost, setOpenDetails, selectPostById } =
    React.useContext(PostContext)!;

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
          {postList.map((p: Post) => (
            <tr data-cy="Post" key={p.id}>
              <td data-cy="PostId">{p.id}</td>

              <td data-cy="PostTitle">{p.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${
                    post && post.id === p.id ? '' : 'is-light'
                  }`}
                  onClick={() => {
                    if (post && post.id === p.id) {
                      setPost(null);
                      setOpenDetails(false);
                    } else {
                      selectPostById(p.id);
                      setOpenDetails(true);
                    }
                  }}
                >
                  {post && post.id === p.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
