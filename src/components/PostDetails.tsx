import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { deleteComment, getPostComments, postComment } from '../api/api';
import { ErrorType } from '../types/ErrorType';
import { ErrorMessage } from './ErrorMessage';

class CommentInfo implements Comment {
  id: number;

  postId: number;

  name: string;

  email: string;

  body: string;

  constructor({
    id, postId, name, email, body,
  }: Comment) {
    this.id = id || 0;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
  }
}

type Props = {
  post: Post;
  onError: (error: ErrorType | null) => void;
  errorType: ErrorType | null;
};

export const PostDetails: React.FC<Props> = ({ post, onError, errorType }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const hasNoComments = (
    !comments.length
    && !isLoading
    && errorType !== ErrorType.COMMENTS
  );
  const hasComments = (
    !!comments.length
    && !isLoading
    && errorType !== ErrorType.COMMENTS
  );

  const isWriteCommentButtonVisible = (
    !isFormVisible
    && !isLoading
    && errorType !== ErrorType.COMMENTS
  );

  const loadComments = async () => {
    try {
      const commentsFromServer = await getPostComments(post.id);
      const commentsInfo = commentsFromServer.map(
        comment => new CommentInfo(comment),
      );

      setComments(commentsInfo);
    } catch {
      onError(ErrorType.COMMENTS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (comment: CommentData) => {
    try {
      await postComment({
        ...comment,
        postId: post.id,
      });
      await loadComments();
    } catch {
      onError(ErrorType.COMMENT_POST);
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(comments.filter(({ id }) => id !== commentId));
      await deleteComment(commentId);
    } catch {
      onError(ErrorType.COMMENT_DELETE);
      loadComments();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setIsFormVisible(false);
    onError(null);
    loadComments();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {(
            errorType === ErrorType.COMMENTS
            || errorType === ErrorType.COMMENT_DELETE
          )
            && <ErrorMessage errorType={errorType} />}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>

                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id || 0)}
                    >
                      delete button
                    </button>
                  </div>

                  <div
                    className="message-body"
                    data-cy="CommentBody"
                  >
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {isWriteCommentButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}

        </div>

        {isFormVisible && (
          <NewCommentForm
            onCommentAdd={handleAddComment}
            isSubmitting={isFormSubmitting}
            onloading={setIsFormSubmitting}
            errorType={errorType}
          />
        )}
      </div>
    </div>
  );
};
