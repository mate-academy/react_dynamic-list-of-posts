import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../utils/fetchClient';

type Props = {
  activePost: Post;
};

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    setIsCommentFormVisible(false);
    getComments(activePost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoadingComments(false));
  }, [activePost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
    } catch (error) {
      setIsError(true);
      alert(error);
    } finally {
      setComments(commentsList =>
        commentsList.filter(comment => comment.id !== commentId),
      );
    }
    /*setComments(commentsList => [
          ...commentsList,
          comments.find(comment => comment.id === commentId)!,
        ]);*/
  };

  const onAddComment = ({ name, email, body }: CommentData) => {
    const postId = activePost?.id;

    setIsLoadingComment(true);
    addComment({ postId, name, email, body })
      .then(newComment => setComments([...comments, newComment]))
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoadingComment(false));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${activePost?.id}: ${activePost?.title}`}
          </h2>

          <p data-cy="PostBody">{activePost?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoadingComments && comments?.length === 0 && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments?.length > 0 && (
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
                      onClick={() => handleDeleteComment(comment.id)}
                    ></button>
                  </div>
                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}
          {/*<article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>
            <div className="message-body" data-cy="CommentBody">
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>

              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {'Multi\nline\ncomment'}
            </div>
          </article>
          */}

          {!isLoadingComments && !isCommentFormVisible && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormVisible && (
          <NewCommentForm
            onAddComment={onAddComment}
            isLoadingComment={isLoadingComment}
          />
        )}
      </div>
    </div>
  );
};
