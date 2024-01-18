import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { createComment, deleteComment, getPostComments } from '../api/comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const noComments = selectedPost && !comments.length && !isLoading;
  const areComments = selectedPost && !isError && comments.length && !isLoading;

  function loadComments() {
    if (selectedPost) {
      setIsLoading(true);
      setIsError(false);
      setIsFormVisible(false);

      getPostComments(selectedPost.id)
        .then(setComments)
        .catch((error) => {
          setIsError(true);
          throw error;
        })
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(loadComments, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    setIsError(false);
    setComments(prevCommnets => prevCommnets
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .catch((error) => {
        setIsError(true);
        setComments(comments);
        throw error;
      });
  };

  const handleAddComment = ({
    name,
    email,
    body,
  }: CommentData) => {
    setIsError(false);

    createComment({
      postId: selectedPost.id,
      name,
      email,
      body,
    })
      .then(comment => {
        setComments(currentComments => [...currentComments, comment]);
      })
      .catch((error) => {
        setIsError(true);
        throw error;
      });
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
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!!noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!areComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
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
              ))}
            </>
          )}

          {!isLoading && !isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            onSubmit={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
