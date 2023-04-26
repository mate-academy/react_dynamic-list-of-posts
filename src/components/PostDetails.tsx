import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addCommentToList, deleteComment, getComments } from './api/comments';

type Props = {
  activePost: Post,
};

export const PostDetails: React.FC<Props> = ({
  activePost,
}) => {
  const { id, title, body } = activePost;
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [addNewComment, setAddNewComment] = useState(false);

  useEffect(() => {
    if (activePost) {
      setIsCommentsLoading(true);
      getComments(id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsCommentsLoading(false));
    }

    return () => {
      setComments([]);
    };
  }, [activePost]);

  const createComment = (
    name: string,
    email: string,
    bodyComment: string,
  ) => (
    addCommentToList({
      name,
      email,
      body: bodyComment,
      postId: activePost.id,
    })
      .then(submitedComment => setComments(
        currentComments => [...currentComments, submitedComment],
      ))
      .catch(() => setIsError(true))
  );

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(currentComents => (
          currentComents.filter(comment => comment.id !== commentId)
        ));
      })
      .catch(() => setIsError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${id}:${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isCommentsLoading
            && (!comments.length
              ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )
              : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => {
                    const {
                      name,
                      email,
                      id: commentId,
                      body: commentBody,
                    } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={commentId}
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${email}`}
                            data-cy="CommentAuthor"
                          >
                            {name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => removeComment(commentId)}
                          >
                            delete button
                          </button>
                        </div>

                        <div
                          className="message-body"
                          data-cy="CommentBody"
                        >
                          {commentBody}
                        </div>
                      </article>
                    );
                  })}
                </>
              ))}

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
              Some comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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
            <div
              className="message-body"
              data-cy="CommentBody"
            >
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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

          {!addNewComment && !isCommentsLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setAddNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {addNewComment && (
          <NewCommentForm
            updateComments={createComment}
          />
        )}
      </div>
    </div>
  );
};
