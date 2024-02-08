import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/posts';

interface Props {
  post: Post | null;
  isCommentFormActive: boolean;
  onFormStatusChange: (value: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  isCommentFormActive,
  onFormStatusChange,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isButtonVisible = !isLoading && !isError && !isCommentFormActive;

  useEffect(() => {
    if (post) {
      setIsLoading(true);

      getComments(post.id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }

    return () => setIsError(false);
  }, [post]);

  if (!post) {
    return null;
  }

  const { id, title, body } = post;

  const isCommentsVisible = !isLoading && !isError && !!comments.length;
  const isNoComments = !isLoading && !isError && !comments.length;

  const addNewComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  const removeComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    deleteComment(commentId)
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
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

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsVisible && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({
                name,
                body: commentBody,
                id: commentId,
                email,
              }) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={commentId}
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
                      onClick={() => removeComment(commentId)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {commentBody}
                  </div>
                </article>
              ))}
            </>
          )}

          {isButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onFormStatusChange(true)}
              hidden={!isCommentFormActive}
            >
              Write a comment
            </button>
          )}

        </div>
        {isCommentFormActive && (
          <NewCommentForm
            postId={post.id}
            onAddComment={addNewComment}
          />
        )}
      </div>
    </div>
  );
};
