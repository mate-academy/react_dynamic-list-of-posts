import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getComments } from '../api/api';

interface PostDetailsProps {
  selectedPost: Post,
}

export const PostDetails: React.FC<PostDetailsProps> = ({ selectedPost }) => {
  const [postError, setPostError] = useState(false);
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentAdd = (name: string, email: string, comment: string) => {
    setCommentLoading(true);
    addComment(selectedPost.id, name, email, comment)
      .then(newComment => {
        setComments([...comments, newComment]);
      })
      .catch(() => setPostError(true))
      .finally(() => setCommentLoading(false));
  };

  const handleCommentDelete = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));

    deleteComment(commentId);
  };

  useEffect(() => {
    setPostError(false);
    setCommentsLoading(true);
    setFormDisplayed(false);

    getComments(selectedPost.id)
      .then(newComments => {
        setComments(newComments);
      })
      .catch(() => setPostError(true))
      .finally(() => setCommentsLoading(false));
  }, [selectedPost]);

  const handleShowAddComment = useCallback(() => {
    setFormDisplayed(true);
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost.body}
        </p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {postError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : (
          <>
            {!commentsLoading && !comments.length && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!commentsLoading && comments.length > 0
            && <p className="title is-4">Comments:</p>}
            {!commentsLoading && comments.length > 0
            && comments.map(comment => {
              const {
                name,
                email,
                body,
                id,
              } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleCommentDelete(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {!commentsLoading && !formDisplayed && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => handleShowAddComment()}
          >
            Write a comment
          </button>
        )}

        {formDisplayed && (
          <NewCommentForm
            commentLoading={commentLoading}
            commentAdd={handleCommentAdd}
          />
        )}
      </div>
    </div>
  );
};
