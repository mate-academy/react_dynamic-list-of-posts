import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/api';

interface Props {
  post: Post;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLoading: boolean;
  errorMessage: string;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  setComments,
  isLoading,
  errorMessage,
}) => {
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [deleteErrorId, setDeleteErrorId] = useState<number | null>(null);

  useEffect(() => {
    setShowNewCommentForm(false);
  }, [post]);

  const handleDeleteComment = async (commentId: number) => {
    setDeleteErrorId(null);
    const savedComments = [...comments];

    try {
      setComments(current =>
        current.filter(comment => comment.id !== commentId),
      );

      await deleteComment(commentId);
    } catch (error) {
      setDeleteErrorId(commentId);
      setComments(savedComments);
    } finally {
    }
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
        {isLoading && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!errorMessage && !isLoading && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!errorMessage && !isLoading && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <React.Fragment key={comment.id}>
                <article className="message is-small" data-cy="Comment">
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
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
                {deleteErrorId === comment.id && (
                  <div className="notification is-danger">
                    Unable delete comment
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        )}

        {!showNewCommentForm && !errorMessage && !isLoading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowNewCommentForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {showNewCommentForm && (
        <NewCommentForm postId={post.id} setComments={setComments} />
      )}
    </div>
  );
};
