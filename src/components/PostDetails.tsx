import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentsList } from './CommentsList';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentsLoadError, setCommentsLoadError] = useState('');
  const [commentsDelError, setCommentsDelError] = useState<number[]>([]);
  const [addNewComment, setAddNewComment] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCommentsLoadError('');
    setShowComments(false);
    setAddNewComment(false);

    client.get<Comment[]>(`/comments?postId=${id}`)
      .then(response => {
        setComments(response);
        setShowComments(true);
      })
      .catch(() => setCommentsLoadError("Can't load comments for current post"))
      .finally(() => setLoading(false));
  }, [post]);

  const handleDeleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`)
      .then(() => {
        setComments(
          current => current.filter(item => item.id !== commentId),
        );
        setCommentsDelError([]);
      })
      .catch(() => setCommentsDelError(current => [...current, commentId]));
  };

  const handleAddNewComment = (newComment: Comment) => {
    setComments(current => [...current, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="block">
            {showComments && (!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <CommentsList
                comments={comments}
                commentsDelError={commentsDelError}
                onDeleteComment={handleDeleteComment}
              />
            ))}

            {commentsLoadError ? (
              <div
                className="notification is-danger"
                data-cy="PostsLoadingError"
              >
                {commentsLoadError}
              </div>
            ) : !addNewComment && (
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
        )}

        {addNewComment && (
          <NewCommentForm
            postId={id}
            onAddNewComment={handleAddNewComment}
          />
        )}
      </div>
    </div>
  );
};
