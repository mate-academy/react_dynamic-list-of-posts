import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { NotificationType } from '../types/NotificationType';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getPostComments } from '../api/comments';
import { CommentMessage } from './CommentMessage';
import { NotificationMassege } from '../types/NotificationMassege';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCommentForm, setNewCommentForm] = useState(false);
  const [notification, setNotification] = useState<NotificationMassege>(
    NotificationMassege.NONE,
  );

  const getComments = async (postId: number) => {
    try {
      setLoading(true);
      const comments = await getPostComments(postId);

      if (!comments.length) {
        setNotification(NotificationMassege.NO_COMMENTS);
      }

      setPostComments(comments);
    } catch {
      setNotification(NotificationMassege.GET_COMMENTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post?.id) {
      setPostComments([]);
      setNewCommentForm(false);
      setNotification(NotificationMassege.NONE);
      getComments(post.id);
    }
  }, [post]);

  useEffect(() => {
    if (postComments.length > 0) {
      setNotification(NotificationMassege.NONE);
    }
  }, [postComments]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setPostComments((current: Comment[]) => {
      return current.filter(comment => comment.id !== commentId);
    });

    if (postComments.length) {
      setNotification(NotificationMassege.NO_COMMENTS);
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

          {(notification !== NotificationMassege.NONE)
            && (notification !== NotificationMassege.NO_COMMENTS)
            && (
              <Notification
                type={NotificationType.danger}
                massege={notification}
                dataCy="CommentsError"
              />
            )}

          {notification === NotificationMassege.NO_COMMENTS && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {NotificationMassege.NO_COMMENTS}
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

          {(!loading && !newCommentForm) && (
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

        {(newCommentForm) && (
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
