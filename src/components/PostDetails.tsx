import React, {useEffect, useState} from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as CommentService from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post,
  isFormVisible: boolean,
  setIsFormVisible: (arg: boolean) => void,
}

export const PostDetails: React.FC<Props> = ({
  currentPost,
  isFormVisible,
  setIsFormVisible,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isDeletingError, setIsDeletingError] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true)

    CommentService.getComments(currentPost.id)
      .then(setComments)
      .catch(() => {
        setIsLoadingError(true)
      })
      .finally(() => {
        setIsLoadingComments(false);
      })
  }, [currentPost]);

  const handleAddComment = (response: Comment) => {
    setComments([...comments, response]);
  };

  const handleDeleteComment = (commentId: number) => {
    setIsDeletingError(false);

    CommentService.deleteComment(commentId)
      .then(() => {
        setComments(comments => comments.filter(comment => comment.id !== commentId));
      })
      .catch(() => {
        setIsDeletingError(true);
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
          {isLoadingComments && <Loader />}

          {isLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !isLoadingComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
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

          {isDeletingError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Unable to add comment, try again.
            </p>
          )}

          {!isFormVisible && !isLoadingComments && (
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
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
