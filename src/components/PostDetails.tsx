import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments, postComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';
import { CommentsList } from './CommentsList';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const {
    id,
    title,
    body,
  } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsFormOpen(false);
    setIsError(false);

    getComments(id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  const createComment = (
    comment: CommentData,
  ) => {
    const preparedComment = {
      postId: post.id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    };

    setIsFormLoading(true);
    setIsError(false);

    postComment(preparedComment)
      .then((postedComment) => setComments([...comments, postedComment]))
      .catch(() => setIsError(true))
      .finally(() => setIsFormLoading(false));
  };

  const removeComment = (commentId: number) => {
    setIsError(false);
    setComments(comments.filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .catch(() => setIsError(true));
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

          {isError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              <CommentsList
                comments={comments}
                removeComment={removeComment}
              />
            </>
          )}

          {!isLoading && !isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            createComment={createComment}
            isLoading={isFormLoading}
          />
        )}
      </div>
    </div>
  );
};
