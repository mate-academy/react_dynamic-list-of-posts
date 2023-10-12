import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments, deleteComment, postComment } from '../api';
import { Comment } from '../types/Comment';

type Props = {
  openedPost: Post;
};

enum Error {
  None,
  CommentsLoadingError,
  NoCommentsError,
}

export const PostDetails: React.FC<Props> = ({
  openedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
  const [isCommentsAdding, setIsCommentsAdding] = useState(false);
  const [error, setError] = useState<Error>(Error.None);

  const addComment = (newComment: Omit<Comment, 'id'>) => {
    setIsCommentsAdding(true);
    postComment(newComment)
      .then((res) => {
        setComments((oldComments) => (
          [...oldComments, res]
        ));
        setError(Error.None);
        setIsCommentsAdding(false);
      })
      .catch(() => {
        setError(Error.CommentsLoadingError);
        setIsCommentsAdding(false);
        setTimeout(() => {
          setError(Error.None);
        }, 3000);
      });
  };

  const onDelete = (id: number) => {
    deleteComment(id)
      .then(() => {
        setComments((oldComments) => (
          oldComments.filter(comm => (
            comm.id !== id
          ))
        ));
        setError(Error.None);

        if (!comments.length) {
          setError(Error.NoCommentsError);
          setIsCommentsLoaded(false);
        }
      })
      .catch(() => {
        setError(Error.CommentsLoadingError);
        setTimeout(() => {
          setError(Error.None);
        }, 3000);
      });
  };

  const loadCommentsOfUser = (postId: number) => {
    setIsCommentsLoading(true);
    setIsCommentsLoaded(false);
    getComments(postId)
      .then(res => {
        setComments(res);
        setIsCommentsLoaded(true);

        if (!res.length) {
          setError(Error.NoCommentsError);
          setIsCommentsLoaded(false);
        }
      })
      .catch(() => {
        setError(Error.CommentsLoadingError);
        setComments([]);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  };

  useEffect(() => {
    loadCommentsOfUser(openedPost.id);
  }, [openedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${openedPost.id}: ${openedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {openedPost.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {error === Error.CommentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {error === Error.NoCommentsError
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsLoaded && (
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
                      onClick={() => onDelete(comment.id)}
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

          {!isNewCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentForm && (
          <NewCommentForm
            postId={openedPost.id}
            addComment={addComment}
            isCommentsAdding={isCommentsAdding}
          />
        )}
      </div>
    </div>
  );
};
