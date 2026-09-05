import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, NewCommentData } from '../types/Comment';
import { createComment, deleteComment, getComments } from '../servises/coments';

type Props = {
  openPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ openPost }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!openPost?.id) {
      return;
    }

    setLoading(true);
    setIsFormOpen(false);
    getComments(openPost?.id || 0)
      .then(commentsFromServer => setComments(commentsFromServer))
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [openPost?.id]);

  function handleDeleteComment(commentToDelete: Comment) {
    setError(false);

    setComments(prev =>
      prev ? prev.filter(c => c.id !== commentToDelete.id) : [],
    );

    deleteComment(commentToDelete.id).catch(er => {
      setError(true);

      setComments(prev =>
        prev ? [...prev, commentToDelete] : [commentToDelete],
      );
      throw er;
    });
  }

  function handleCreateComment(newCommentData: NewCommentData) {
    setError(false);

    return createComment(newCommentData)
      .then(createdComment => {
        setComments(prev =>
          prev ? [...prev, createdComment] : [createdComment],
        );
      })
      .catch(er => {
        setError(true);
        throw er;
      });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${openPost?.id}: ${openPost?.title}`}</h2>

        <p data-cy="PostBody">{openPost?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {error && !loading && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
          </div>
        )}

        {comments?.length === 0 && !error && !loading && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {Boolean(comments?.length) && !loading && (
          <p className="title is-4">Comments:</p>
        )}

        {!loading &&
          comments?.map(comment => (
            <article
              key={comment?.id}
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
                  onClick={() => handleDeleteComment(comment)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

        {!isFormOpen && !loading && !error && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormOpen && (
        <NewCommentForm
          postId={openPost?.id || 0}
          onSubmit={handleCreateComment}
        />
      )}
    </div>
  );
};
