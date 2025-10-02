import React from 'react';
import { Loader } from './Loader';
import { LoaderState } from '../types/LoaderState';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  selectedPost: Post;
  comments: Comment[];
  loaderComment: LoaderState;
  errorMessageComment: string | null;
  isOpenComment: boolean;
  setIsOpenComment: (value: boolean) => void;
  deleteComment: (commentId: number) => Promise<void>;
}

export const PostDetailsItem: React.FC<Props> = ({
  selectedPost,
  comments,
  loaderComment,
  errorMessageComment,
  isOpenComment,
  setIsOpenComment,
  deleteComment,
}) => {
  const showNoComment =
    !errorMessageComment && loaderComment === 'loaded' && comments.length === 0;

  return (
    <>
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>
      <div className="block">
        {loaderComment === 'loading' && <Loader />}

        {errorMessageComment && loaderComment === 'loaded' && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {showNoComment && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!errorMessageComment && loaderComment === 'loaded' && (
          <p className="title is-4">Comments:</p>
        )}

        {loaderComment === 'loaded' &&
          comments.map((comment: Comment) => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => deleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

        {/* eslint-disable prettier/prettier */}
        {!errorMessageComment &&
          loaderComment === 'loaded' &&
          !isOpenComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsOpenComment(true)}
          >
              Write a comment
          </button>
        )}
      </div>
    </>
  );
};
