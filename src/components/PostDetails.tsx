import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../entities/Post';
import { Comment, CommentData } from '../entities/Comment';
import {
  addComment,
  deleteComment,
  getComments,
} from '../entities/Comment/comment.service';
import { ErrorMessage } from '../entities/Error';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null);
  const [isFormVisible, setisFormVisible] = useState(false);

  useEffect(() => {
    if (post) {
      setErrorMessage(null);
      setLoading(true);
      getComments(post.id)
        .then(setComments)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [post]);

  const hasComments = comments && comments.length > 0;
  const noComments = comments && comments.length === 0;
  const isCommentsLoaded = !loading && comments !== null;

  const handleDeleteComment = (commentId: Comment['id']) => {
    setErrorMessage(null);

    const previousComments = comments;

    setComments(current =>
      current ? current.filter(comm => comm.id !== commentId) : null,
    );

    deleteComment(commentId).catch(() => {
      setErrorMessage('Something went wrong!');
      setComments(previousComments);
    });
  };

  const handleSubmitForm = (data: CommentData): Promise<void> => {
    setErrorMessage(null);

    return addComment({ postId: post?.id, ...data })
      .then(newComment => {
        setComments(current =>
          current ? [...current, newComment] : [newComment],
        );
      })
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  };

  useEffect(() => {
    setisFormVisible(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {isCommentsLoaded && noComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsLoaded && hasComments && (
          <>
            <p className="title is-4">Comments:</p>

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

        {isCommentsLoaded && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setisFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormVisible && <NewCommentForm onSubmit={handleSubmitForm} />}
    </div>
  );
};
