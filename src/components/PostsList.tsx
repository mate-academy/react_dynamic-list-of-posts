import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { getCommentsByPostId } from '../api/comments';
import { Comment } from '../types/Comment';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  posts: Post[],
  selectedPost: Post | null,
  onSelectPost: React.Dispatch<React.SetStateAction<Post | null>>,
  onSetComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  onSetCommentLoader: React.Dispatch<React.SetStateAction<boolean>>,
  onSetErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessage | null>>,
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  onSelectPost,
  onSetComments,
  onSetCommentLoader,
  onSetErrorMessage,
}) => {
  const handleSelectPost = (post: Post) => {
    if (selectedPost === post) {
      onSelectPost(null);

      return;
    }

    onSetErrorMessage(null);
    onSelectPost(post);
    onSetCommentLoader(true);
    getCommentsByPostId(post.id)
      .then(response => {
        onSetComments(response);
      })
      .catch(() => {
        onSetErrorMessage(ErrorMessage.GET_COMMENTS_ERROR);
      })
      .finally(() => {
        onSetCommentLoader(false);
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !(selectedPost?.id === post.id),
                  })}
                  onClick={() => {
                    handleSelectPost(post);
                  }}
                >
                  {selectedPost?.id === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
