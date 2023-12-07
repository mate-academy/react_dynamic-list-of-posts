import React, { useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    setSelectedPost,
    setIsErrorComments,
  } = useContext(GlobalContext);

  const handleSelectedPost = (post: Post) => {
    if (selectedPost && selectedPost.id === post?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      setIsErrorComments(false);
    }
  };

  return (
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
          {posts.map(post => {
            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">
                  {post.id}
                </td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    })}
                    onClick={() => handleSelectedPost(post)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
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
