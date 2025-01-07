import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[];
  currentPost: Post;
  addComment: (a: Comment) => Promise<void>;
  isWritePostButton: boolean;
  setIsWritePostButton: (a: boolean) => void;
  deleteComment: (a: number) => void;
  loadingComments: boolean;
  loadingAddNewComment: boolean;
  isError: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  currentPost,
  addComment,
  isWritePostButton,
  setIsWritePostButton,
  deleteComment,
  loadingComments,
  loadingAddNewComment,
  isError,
}) => {
  if (!currentPost) {
    return null;
  }

  const handleOpenWritePost = () => {
    setIsWritePostButton(true);
  };

  const handleDeleteComment = (postId: number) => {
    deleteComment(postId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost.id}: ${currentPost.title}`}
          </h2>

          <p data-cy="PostBody">{currentPost.body}</p>
        </div>
        {loadingComments && <Loader />}
        <div className="block">
          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!loadingComments && !isError && (
            <>
              {comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}
        </div>
        {!loadingComments &&
          !isError &&
          (isWritePostButton ? (
            <NewCommentForm
              addComment={addComment}
              postId={currentPost.id}
              loadingAddNewComment={loadingAddNewComment}
            />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenWritePost}
            >
              Write a comment
            </button>
          ))}
      </div>
    </div>
  );
};
