import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComments, getComments } from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  function clearState() {
    setIsError(false);
    setIsBtnVisible(false);
    setIsFormVisible(false);
    setComments([]);
  }

  useEffect(() => {
    clearState();
    setIsLoading(true);
    getComments(post.id)
      .then(data => {
        setComments(data);
        setIsBtnVisible(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  function handleVisibleCommentForm() {
    setIsFormVisible(true);
    setIsBtnVisible(false);
  }

  function handleAddComment(newComment: Comment) {
    setComments(prevCommentList => [...prevCommentList, newComment]);
  }

  function handleDeleteComment(commentId: number) {
    setComments(prevCommentsList =>
      prevCommentsList.filter(({ id }) => id !== commentId),
    );
    deleteComments(commentId);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !comments.length && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={`${comment.postId}` + `${comment.id}`}
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

          {isBtnVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleVisibleCommentForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm postId={post.id} onAddComment={handleAddComment} />
        )}
      </div>
    </div>
  );
};
