import React, { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from '../AppContext';
import { Post } from '../../types/Post';

export const PostsList: React.FC = React.memo(() => {
  const {
    userPosts,
    setSelectedPost,
    selectedPost,
    setComments,
  } = useContext(AppContext);

  const handleClickPost = (post: Post) => {
    setComments([]);

    setSelectedPost(prevPost => {
      if (prevPost?.id !== post.id) {
        return post;
      }

      return null;
    });
  };

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
          {userPosts.map(userPost => (
            <tr data-cy="Post" key={userPost.id}>
              <td data-cy="PostId">{userPost.id}</td>

              <td data-cy="PostTitle">
                {userPost.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': userPost.id !== selectedPost?.id,
                  })}
                  onClick={() => handleClickPost(userPost)}
                >
                  {userPost.id === selectedPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
