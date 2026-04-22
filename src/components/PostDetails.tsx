import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { LoadingStatus } from '../types/LoadingStatus';
import * as api from '../api';
import { Comment } from '../types/Comment';

const PostDetailsComponent: React.FC<{ openPost: Post }> = ({ openPost }) => {
  const [commentsStatus, setCommentsStatus] = useState<LoadingStatus>('idle');

  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [isSendError, setIsSendError] = useState(false);

  const timeId = useRef<number | null>(null);

  useEffect(() => {
    if (!isSendError) {
      return;
    }

    timeId.current = window.setTimeout(() => {
      setIsSendError(false);
    }, 3000);

    return () => {
      if (timeId.current) {
        clearTimeout(timeId.current);
      }
    };
  }, [isSendError]);

  useEffect(() => {
    if (!openPost) {
      return;
    }

    setIsOpenForm(false);
    setCommentsStatus('loading');

    api
      .getCommentsOfPost(openPost.id)
      .then(fetchComments => {
        setComments(fetchComments);
        setCommentsStatus('success');
      })
      .catch(() => {
        setComments([]);
        setCommentsStatus('error');
      });
  }, [openPost]);

  const deleteComment = (commentId: number) => {
    const prevStateCommetns = comments;

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    api.deleteComment(commentId).catch(() => {
      setIsSendError(true);
      setComments(prevStateCommetns);
    });
  };

  const addComment = (comment: Omit<Comment, 'id' | 'postId'>) => {
    const commentWithPostId: Omit<Comment, 'id'> = {
      ...comment,
      postId: openPost.id,
    };

    return api
      .createComment(commentWithPostId)
      .then(newComment => {
        setComments(prevComment => [...prevComment, newComment]);
      })
      .catch(() => {
        setIsSendError(true);
        throw new Error('Something went wrong');
      });
  };

  const renderCommentsContent = () => {
    switch (commentsStatus) {
      case 'idle':
        return null;

      case 'loading':
        return <Loader />;

      case 'error':
        return (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        );

      case 'success':
        if (comments.length === 0) {
          return (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          );
        }

        return (
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
                    onClick={() => deleteComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${openPost?.id}: ${openPost?.title}`}</h2>

        <p data-cy="PostBody">{openPost?.body}</p>
      </div>

      <div className="block">
        {renderCommentsContent()}
        {!isOpenForm && commentsStatus === 'success' && (
          <button
            onClick={() => setIsOpenForm(true)}
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        )}
      </div>
      {isOpenForm && <NewCommentForm onSubmit={addComment} />}

      {isSendError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </div>
  );
};

export const PostDetails = React.memo(PostDetailsComponent);
