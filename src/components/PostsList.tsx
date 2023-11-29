import React, { useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from './GeneralContext';
import { Post } from '../types/Post';
import * as commentsService from '../api/comments';
import { ErrorType } from '../types/ErrorType';

export const PostsList: React.FC = () => {
  const {
    posts,
    selectedPost,
    setSelectedPost,
    setComments,
    setError,
    setIsCommentsLoading,
    setIsFormOpen,
  } = useContext(GlobalContext);

  const handleSetSelectedPost = (post: Post) => {
    setError(ErrorType.None);
    setIsFormOpen(false);

    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
      setComments([]);
    } else {
      setIsCommentsLoading(true);
      setSelectedPost(post);
      commentsService.getComments(post.id).then(setComments)
        .catch((err) => {
          setError(ErrorType.CommentsLoadingError);
          throw err;
        })
        .finally(() => setIsCommentsLoading(false));
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  onClick={() => handleSetSelectedPost(post)}
                  className={classNames(
                    'button', 'is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    },
                  )}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
