import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);

  const deleteCommentHandler = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        const updatedComments = comments.filter(prev => prev.id !== commentId);

        setComments(updatedComments);
      })
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    setIsLoading(true);
    setIsCommentButtonClicked(false);

    getComments(selectedPost)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

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
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(comments.length > 0 && !hasError && !isLoading) ? (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => deleteCommentHandler(comment.id)}
                    >
                      delete button
                    </button>
                  </div>
                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentButtonClicked && !isLoading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentButtonClicked(!isCommentButtonClicked)}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isCommentButtonClicked && !isLoading) && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
            setCommentErrorMessage={setHasError}
          />
        )}
      </div>
    </div>
  );
};
