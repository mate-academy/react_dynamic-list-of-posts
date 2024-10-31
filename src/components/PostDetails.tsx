import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { deleteComment, getComments, postComment } from '../services/post';
import { Loader } from './Loader';
import { Comment, CommentData } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  selectedPost: Post;
  isOpenedNewCommentForm: boolean;
  onOpenNewCommentForm: (answer: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isOpenedNewCommentForm,
  onOpenNewCommentForm,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const hasNoComments =
    !isLoading && error.length === 0 && comments && comments.length === 0;
  const hasAlreadyComments =
    !isLoading && error.length === 0 && comments && comments.length > 0;
  const isShowNewCommentButton =
    !isLoading && !isOpenedNewCommentForm && error.length === 0;

  const addNewComment = ({ name, email, body }: CommentData) => {
    setIsSubmitting(true);

    const postId = selectedPost.id;

    return postComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currentComments => {
          if (currentComments) {
            return [...currentComments, newComment];
          }

          return [newComment];
        });
      })
      .catch(loadingError => {
        setError(`commentAddError ${loadingError}`);

        throw loadingError;
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onDeleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments
        ? currentComments.filter(comment => comment.id !== commentId)
        : [],
    );

    deleteComment(commentId)
      .catch(deletingError => {
      setError(`commentDeletingError ${deletingError}`);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    onOpenNewCommentForm(false);
    setError('');

    getComments(selectedPost.id)
      .then(setComments)
      .catch(loadingError => {
        setError(`commentsLoadingError ${loadingError}`);

        throw loadingError;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && error.length > 0 && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasAlreadyComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a href={`${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onDeleteComment(comment.id)}
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

          {isShowNewCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onOpenNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenedNewCommentForm && error.length === 0 && (
          <NewCommentForm
            addNewComment={addNewComment}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};
