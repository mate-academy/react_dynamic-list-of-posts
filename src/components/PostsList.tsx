import React from 'react';
import { usePostsContext } from '../Context/PostsContext';

export const PostsList: React.FC = () => {
  const {
    posts, handleClickOpenComments, chosenPost, isOpenPost,
  } = usePostsContext();

  const showPost = posts?.find(post => post.id === chosenPost) || null;

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
          {posts?.map(post => {
            const {
              title, id,
            } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={showPost?.id === id && isOpenPost
                      ? 'button is-link' : 'button is-link is-light'}
                    onClick={() => handleClickOpenComments(id)}
                  >
                    {isOpenPost && showPost?.id === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
