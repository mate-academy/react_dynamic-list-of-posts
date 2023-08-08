import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { Comments } from '../Comments/Comments';
import { client } from '../../utils/fetchClient';
import { Notification } from '../../types/Notification';
import { Loader } from '../Loader';
import {
  NotificationMessage,
} from '../NotificationMessage/NotificationMessage';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Notification>(Notification.NoError);
  const [noComments, setNoComments] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setShowForm(false);
    setShowButton(true);
    setNoComments(false);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then((data) => {
        if (data.length === 0) {
          setError(Notification.NoCommentsMessage);
          setNoComments(true);
        }

        setComments(data);
      })
      .catch(() => {
        setLoadingError(true);
        setError(Notification.PostsLoadingError);
      })
      .finally(() => setIsLoading(false));
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    client
      .delete(`/comments/${commentId}`)
      .then(() => {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId,
        );

        if (updatedComments.length === 0) {
          setNoComments(true);
        }

        setComments(updatedComments);
      });
  };

  const handleAddComment = (newComment: Comment) => {
    setIsLoadingSubmit(true);

    client
      .post<Comment>('/comments/', newComment)
      .then(response => {
        if (comments.length === 0) {
          setNoComments(false);
        }

        setComments([...comments, response]);
      })
      .finally(() => setIsLoadingSubmit(false));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">

          {isLoading && (
            <Loader />
          )}

          {!isLoading && loadingError && (
            <NotificationMessage
              notification={error}
              errorType="is-danger"
              data="CommentsError"
            />
          )}

          {!isLoading && !loadingError && noComments && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )}

          {!isLoading && !loadingError && !noComments && (
            <>
              <Comments
                comments={comments}
                onDelete={handleDeleteComment}
              />
            </>
          )}

          {!isLoading && !loadingError && !noComments && showButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setShowForm(true);
                setShowButton(false);
              }}
            >
              Write a comment
            </button>
          )}

          {showForm && (
            <NewCommentForm
              selectedPost={post}
              comments={comments}
              onAdd={handleAddComment}
              loading={isLoadingSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
