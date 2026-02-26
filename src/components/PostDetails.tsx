import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { deleteComment, getComments, postComment } from '../api/comment';
import { ErrorMessage } from '../types/ErrorMessage';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoader, setCommentLoader] = useState(false);
  const [errorCommentMessage, setErrorCommentMessage] = useState<ErrorMessage>(
    ErrorMessage.None,
  );
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setCommentLoader(true);
    setErrorCommentMessage(ErrorMessage.None);
    setComments([]);
    setFormIsOpen(false);

    getComments(post.id)
      .then(setComments)
      .catch(() => setErrorCommentMessage(ErrorMessage.GetMethodError))
      .finally(() => setCommentLoader(false));
  }, [post]);

  const handleAddComment = (commentData: CommentData) => {
    if (!post) {
      return Promise.reject();
    }

    setErrorCommentMessage(ErrorMessage.None);

    return postComment({ ...commentData, postId: post.id })
      .then(newComment => {
        setComments(prevComments => [...prevComments, newComment]);
      })
      .catch(error => {
        setErrorCommentMessage(ErrorMessage.PostCommentError);
        throw error;
      });
  };

  const handleDeleteMessage = (commentId: number) => {
    setErrorCommentMessage(ErrorMessage.None);

    const currentComments = [...comments];

    setComments(prevComments => prevComments.filter(c => c.id !== commentId));

    return deleteComment(commentId).catch(error => {
      setComments(currentComments);
      setErrorCommentMessage(ErrorMessage.DeleteCommentError);
      throw error;
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {commentLoader && <Loader />}

        {!commentLoader && errorCommentMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorCommentMessage}
          </div>
        )}

        {!commentLoader && !errorCommentMessage && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!commentLoader && comments.length !== 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
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
                    onClick={() => handleDeleteMessage(comment.id)}
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
        {!commentLoader &&
          !errorCommentMessage &&
          (formIsOpen ? (
            <NewCommentForm onSubmit={handleAddComment} />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormIsOpen(true)}
            >
              Write a comment
            </button>
          ))}
      </div>
    </div>
  );
};
