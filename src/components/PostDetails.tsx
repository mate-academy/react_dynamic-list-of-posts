import React, { useEffect, useState } from 'react';
import { Notification } from './Notification';
import { NotificationType } from '../types/NotificationType';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getPostComments } from '../api/comments';
import { CommentMessage } from './CommentMessage';

type Props = {
  post: Post | null;
  newCommentForm: boolean;
  setNewCommentForm: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  post, newCommentForm, setNewCommentForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [noComments, setNoComments] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post?.id) {
      setComments([]);
      setNoComments(false);
      setCommentsError(false);
      setLoading(true);

      getPostComments(post.id)
        .then((res) => {
          if (res.length === 0) {
            setNoComments(true);
          } else {
            setComments(res);
          }
        })
        .catch(() => setCommentsError(true))
        .finally(() => setLoading(false));
    }
  }, [post]);

  useEffect(() => {
    if (comments.length > 0) {
      setNoComments(false);
    }
  }, [comments]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setComments((current: Comment[]) => {
      return current.filter(comment => comment.id !== commentId);
    });

    if (comments.length) {
      setNoComments(true);
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

          {commentsError && (
            <Notification
              type={NotificationType.danger}
              massege="Something went wrong"
              dataCy="CommentsError"
            />
          )}

          {(noComments && !commentsError) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!comments.length || (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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

          {(noComments || comments.length > 0) && !newCommentForm && (
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

        {(newCommentForm && !commentsError) && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id || 0}
            onError={setCommentsError}
          />
        )}
      </div>
    </div>
  );
};
