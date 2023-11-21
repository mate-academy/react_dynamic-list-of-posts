import React, {useEffect, useState} from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as CommentService from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post,
  setCommentError: (arg: boolean) => void,
}

export const PostDetails: React.FC<Props> = ({
  currentPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [deletingError, setDeletingError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleFormVisibility = () => {
    setIsFormVisible(false);
  };

  useEffect(() => {
    setLoadingComments(true)

    CommentService.getComments(currentPost.id)
      .then(setComments)
      .catch(() => {
        setLoadingError(true)
      })
      .finally(() => {
        setLoadingComments(false);
      })
  }, [currentPost]);

  const handleAddComment = (response: Comment) => {
    setComments([...comments, response]);
  };

  const handleDeleteComment = (commentId: number) => {
    setDeletingError(false);

    CommentService.deleteComment(commentId)
      .then(() => {
        setComments(comments => comments.filter(comment => comment.id !== commentId));
      })
      .catch(() => {
        setDeletingError(true);
      });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost.id}: ${currentPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost.body}
          </p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {loadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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

          {deletingError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Unable to add comment, try again.
            </p>
          )}

          {!isFormVisible && (
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
            currentPost={currentPost}
            handleFormVisibility={handleFormVisibility}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
