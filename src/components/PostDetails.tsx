/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/posts';

type Props = {
  selectedPost: Post,
  isCommentFormActive: boolean,
  onFormStatusActive: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentFormActive,
  onFormStatusActive,
}) => {
  const { id, title, body } = selectedPost;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isButtonVisible = !isCommentFormActive && !isLoading && !isError;
  const isCommentVisible = !!comments.length && !isLoading && !isError;
  const isNoComments = !comments.length && !isLoading && !isError;

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }

    return () => setIsError(false);
  }, [selectedPost]);

  if (!selectedPost) {
    return null;
  }

  const addNewComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const removeComment = (commentId: number) => {
    setComments(prev => prev.filter((comemnt => comemnt.id !== commentId)));
    deleteComment(commentId)
      .catch(error => console.error(error));
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
          {isLoading && <Loader />}

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

          {isCommentVisible && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({
                id: commentId,
                name,
                body: commentBody,
                email,
              }) => (
                <article
                  key={commentId}
                  className="message is-small"
                  data-cy="Comment"
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
              onClick={() => onFormStatusActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormActive && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            onAddComment={addNewComment}
          />
        )}
      </div>
    </div>
  );
};
