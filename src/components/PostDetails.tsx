import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';
import { client } from '../utils/fetchClient';

interface Props {
  post: Post;
}

enum CommentsState {
  Loading = 'loading',
  LoadingError = 'error',
  LoadingSuccess = 'success',
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsState, setCommentsState] = useState<CommentsState | null>(
    null,
  );

  useEffect(() => {
    setCommentsState(CommentsState.Loading);
    setShowForm(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then((loadedComments: Comment[]) => {
        setComments(loadedComments);
        setCommentsState(CommentsState.LoadingSuccess);
      })
      .catch(() => {
        setCommentsState(CommentsState.LoadingError);
      });
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const oldComments = [...comments];

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    client
      .delete(`/comments/${commentId}`)
      .then(() => {})
      .catch(() => {
        setComments(oldComments);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsState === CommentsState.Loading && <Loader />}

        {commentsState === CommentsState.LoadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {commentsState === CommentsState.LoadingSuccess &&
          (comments.length > 0 ? (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDeleteComment={handleDeleteComment}
                />
              ))}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ))}
        {!showForm && commentsState === CommentsState.LoadingSuccess && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>
      {showForm && (
        <NewCommentForm postId={post.id} setComments={setComments} />
      )}
    </div>
  );
};
