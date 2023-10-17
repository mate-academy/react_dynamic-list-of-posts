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

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
    setIsLoading(true);

    getPostComments(chosenPost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [chosenPost.id]);

  const handleNewComment = () => {
    setIsEditing(true);
  };

  const handleAddingNewComment = (newComment: Comment) => {
    setComments([
      ...comments,
      newComment,
    ]);
  };

  const handleRemoveComment = (deleteId: number) => {
    removeComment(deleteId);

    setComments(comments.filter(comment => comment.id !== deleteId));
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
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
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
                    <a href={comment.email} data-cy="CommentAuthor">
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

          {!isEditing && (
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

        {isEditing && (
          <NewCommentForm
            chosenPostId={chosenPost.id}
            addNewComment={(newComment) => handleAddingNewComment(newComment)}
          />
        )}
      </div>
    </div>
  );
};
