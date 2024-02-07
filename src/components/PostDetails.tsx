import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  CommentsContext,
  CommentsUpdateContext,
} from '../contexts/CommentsProvider';
import { CommentInfo } from './CommentInfo';
import { CommentData } from '../types/Comment';
import { CommentErrors } from '../types/CommentErrors';

interface Props {
  post: Post,
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const {
    addComment,
    loadComments,
    setComments,
  } = useContext(CommentsUpdateContext);
  const {
    comments,
    isLoading,
    errorMessage,
  } = useContext(CommentsContext);

  const [isFormOpened, setIsFormOpened] = useState(false);

  useEffect(() => {
    loadComments(id);

    return () => {
      setComments([]);
      setIsFormOpened(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddNewComment = (commentData: CommentData) => {
    return addComment({
      ...commentData,
      postId: id,
    });
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

          {!!errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {
            !isLoading
            && errorMessage !== CommentErrors.UnableToLoadComments
            && !!comments.length
            && (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <CommentInfo key={comment.id} comment={comment} />
                ))}
              </>
            )
          }

          {
            !isLoading
            && !errorMessage
            && !comments.length
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          }

          {
            !isLoading
            && !errorMessage
            && !isFormOpened
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormOpened(true)}
              >
                Write a comment
              </button>
            )
          }
        </div>

        {isFormOpened && (
          <NewCommentForm handleAddNewComment={handleAddNewComment} />
        )}
      </div>
    </div>
  );
};
