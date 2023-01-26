import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { deleteComment, getComments } from '../api/api';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post;
  addError: boolean;
  setAddError: Dispatch<SetStateAction<boolean>>;
  deleteError: boolean;
  setDeleteError: Dispatch<SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  addError,
  setAddError,
  deleteError,
  setDeleteError,
}) => {
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
    setDeleteError(false);

    deleteComment(id)
      .then(() => setComments(
        prevValue => prevValue.filter(comment => comment.id !== id),
      ))
      .catch(() => setDeleteError(true));
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
              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {addError && (
                <div
                  className="notification is-danger"
                >
                  Unable to add comment!
                </div>
              )}

              {deleteError && (
                <div
                  className="notification is-danger"
                >
                  Unable to delete comment!
                </div>
              )}

              <CommentsList
                comments={comments}
                handleDelete={handleDelete}
              />

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
            setAddError={setAddError}
          />
        )}
      </div>
    </div>
  );
};
