import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { NotificationType } from '../types/NotificationType';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getPostComments } from '../api/comments';
import { CommentMessage } from './CommentMessage';
import { NotificationMessage } from '../types/NotificationMessage';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCommentForm, setNewCommentForm] = useState(false);
  const [notification, setNotification] = useState<NotificationMessage>(
    NotificationMessage.NONE,
  );
  const hasError = notification !== NotificationMessage.NONE
    && notification !== NotificationMessage.NO_COMMENTS;

  const getComments = async (postId: number) => {
    try {
      setLoading(true);
      const comments = await getPostComments(postId);

      if (!comments.length) {
        setNotification(NotificationMessage.NO_COMMENTS);
      }

      setPostComments(comments);
    } catch {
      setNotification(NotificationMessage.GET_COMMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post?.id) {
      setPostComments([]);
      setNewCommentForm(false);
      setNotification(NotificationMessage.NONE);
      getComments(post.id);
    }
  }, [post]);

  useEffect(() => {
    if (postComments.length > 0) {
      setNotification(NotificationMessage.NONE);
    }
  }, [postComments]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setPostComments((current: Comment[]) => {
      return current.filter(comment => comment.id !== commentId);
    });

    if (postComments.length) {
      setNotification(NotificationMessage.NO_COMMENTS);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {(notification !== NotificationMessage.NONE)
            && (notification !== NotificationMessage.NO_COMMENTS)
            && (
              <Notification
                type={NotificationType.danger}
                massege={notification}
                dataCy="CommentsError"
              />
            )}

          {notification === NotificationMessage.NO_COMMENTS && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {NotificationMessage.NO_COMMENTS}
            </p>
          )}

          {!postComments.length || (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
                <CommentMessage
                  key={comment.id}
                  id={comment.id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                  onDelete={handleDelete}
                />
              ))}
            </>
          )}

          {(!loading && !newCommentForm && !hasError)
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setNewCommentForm(true)}
              >
                Write a comment
              </button>
            )}
        </div>

        {(newCommentForm && !hasError) && (
          <NewCommentForm
            setComments={setPostComments}
            postId={post?.id || 0}
            onNotification={setNotification}
          />
        )}
      </div>
    </div>
  );
};
