import React, { useContext } from 'react';
import cn from 'classnames';
import { PostContext } from '../PostsProvider';

export const PostsList: React.FC = () => {
  const {
    currentPosts,
    handleOpenPost,
    selectedPost,
  } = useContext(PostContext);

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
          {currentPosts?.map(post => {
            return (
              <tr data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link',
                      {
                        'is-light': !selectedPost
                        || selectedPost?.id !== post.id,
                      })}
                    onClick={() => handleOpenPost(post)}
                  >
                    {(selectedPost
                      && selectedPost.id === post.id)
                      ? 'Close'
                      : 'Open'}
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
