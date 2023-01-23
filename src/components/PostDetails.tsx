import React, { useEffect, useState } from 'react';
import { deleteComment, getComments } from '../api/api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    setCommentsError(false);
    setIsProcessing(true);
    setFormIsOpen(false);

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsProcessing(false));
  }, [selectedPost]);

  const handleDelete = (id: number) => {
    setComments(
      prevValue => prevValue.filter(comment => comment.id !== id),
    );

    deleteComment(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
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
          {isProcessing && (
            <Loader />
          )}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isProcessing && (
            <>
              {comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={comment.email} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!formIsOpen && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setFormIsOpen(prevValue => !prevValue)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {formIsOpen && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
