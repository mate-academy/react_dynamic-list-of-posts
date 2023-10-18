import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getPostComments, removeComment } from '../api/comment';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  chosenPost: Post,
};

export const PostDetails: React.FC<Props> = ({ chosenPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);

  useEffect(() => {
    setIsEditingComment(false);
    setIsCommentsError(false);
    setIsLoadingComments(true);

    getPostComments(chosenPost.id)
      .then(setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsLoadingComments(false));
  }, [chosenPost.id]);

  const handleNewComment = () => {
    setIsEditingComment(true);
  };

  const handleAddingNewComment = (newComment: Comment) => {
    setComments([
      ...comments,
      newComment,
    ]);
  };

  const handleRemoveComment = (deleteId: number) => {
    setComments(comments.filter(comment => comment.id !== deleteId));

    removeComment(deleteId)
      .catch(() => {
        setIsDeleteError(true);
        setTimeout(() => {
          setIsDeleteError(false);
          setComments([...comments]);
        }, 3000);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${chosenPost.id}: ${chosenPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {chosenPost.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (
            <Loader />
          )}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Unable to load comments
            </div>
          )}

          {!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleRemoveComment(comment.id)}
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

          {isDeleteError && (
            <div className="notification is-danger">
              Unable to delete a comment
            </div>
          )}

          {!isEditingComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isEditingComment && (
          <NewCommentForm
            chosenPostId={chosenPost.id}
            addNewComment={handleAddingNewComment}
          />
        )}
      </div>
    </div>
  );
};
