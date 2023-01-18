import React, { useEffect, useState } from 'react';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost: {
    id,
    title,
    body,
  },
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const [isRemoveError, setIsRemoveError] = useState(false);

  const getPostsComments = async () => {
    try {
      setIsLoading(true);
      setIsLoadingError(false);
      setComments(null);
      setIsButtonHidden(false);

      const commentsFromServer = await getComments(id);

      setComments(commentsFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsLoadingError(true);
      setIsLoading(false);
    }
  };

  const onButtonClick = () => {
    setIsButtonHidden(true);
  };

  const handleCommentAddition = (newComment: Comment) => {
    setComments(prevState => {
      if (prevState) {
        return [
          ...prevState,
          newComment,
        ];
      }

      return [newComment];
    });
  };

  const removeComment = (commentId: number) => {
    setComments(prevState => {
      if (prevState) {
        return prevState.filter(comment => comment.id !== commentId);
      }

      return null;
    });
  };

  const handleCommentRemove = async (commentId: number) => {
    try {
      removeComment(commentId);

      await deleteComment(commentId);
    } catch (error) {
      setIsRemoveError(true);

      setTimeout(() => {
        setIsRemoveError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getPostsComments();
  }, [id]);

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

          {(isLoadingError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && (
            comments.length === 0 ? (
              <>
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>

                {!isButtonHidden && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={onButtonClick}
                  >
                    Write a comment
                  </button>
                )}
              </>
            ) : (
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
                        onClick={() => handleCommentRemove(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}

                {!isButtonHidden && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={onButtonClick}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )
          )}
        </div>

        {isButtonHidden && (
          <NewCommentForm
            postId={id}
            handleCommentAddition={handleCommentAddition}
          />
        )}
      </div>

      {isRemoveError && (
        <div
          className="notification is-danger"
        >
          Something went wrong. Comment will not be removed!
        </div>
      )}
    </div>
  );
};
