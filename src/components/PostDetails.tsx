import React, { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { deleteComment, postComment } from '../api/services';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isLoadComment: boolean;
  isErrorComment: boolean;
  setIsErrorComment: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPost,
  comments,
  isLoadComment,
  isErrorComment,
  setIsErrorComment,
  setComments,
}) => {
  const [isCreateComment, setIsCreateComment] = useState(false);
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  const hasComments = selectedPost && !isLoadComment && !isErrorComment;

  const createNewComment = async (commentData: CommentData) => {
    const data: Comment = {
      postId: selectedPost?.id || 0,
      ...commentData,
    };

    try {
      setIsButtonLoad(true);
      setIsErrorComment(false);
      const newComment: Comment = await postComment(data);

      setComments(prev => [
        ...prev,
        newComment,
      ]);
    } catch {
      setIsErrorComment(true);
    } finally {
      setIsButtonLoad(false);
    }
  };

  useEffect(() => {
    if (selectedPost?.id) {
      setIsCreateComment(true);
    } else {
      setIsCreateComment(false);
    }
  }, [selectedPost]);

  const handleClick = useCallback(() => {
    setIsCreateComment(prev => !prev);
  }, []);

  const removeComment = async (commentId: number) => {
    try {
      setIsErrorComment(false);
      await deleteComment(commentId);

      setComments(comments.filter(comment => comment.id !== commentId));
    } catch {
      setIsErrorComment(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoadComment && (
            <Loader />
          )}

          {isErrorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(hasComments) && (
            <>
              {comments?.length > 0 ? (
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
                          onClick={() => removeComment(comment.id || 0)}
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
                <>
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                </>
              )}

              {isCreateComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleClick}
                >
                  Write a comment
                </button>
              )}
            </>
          )}

        </div>

        {(!isCreateComment && !isErrorComment) && (
          <NewCommentForm
            createNewComment={createNewComment}
            isButtonLoad={isButtonLoad}
          />
        )}

      </div>
    </div>
  );
});
