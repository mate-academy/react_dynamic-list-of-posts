import React, { useEffect, useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { getComments, deleteComments } from '../../utils/commentsApi';

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonHidden, setButtonHidden] = useState(false);
  const [removeError, setIsRemoveError] = useState(false);

  const getPostsComments = async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      setButtonHidden(false);

      const commentFromServer = await getComments(id);

      setComments(commentFromServer);
      setIsLoading(false);
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevState => {
      if (prevState.length) {
        return [...prevState, newComment];
      }

      return [newComment];
    });
  };

  const commentRemove = (commentId: number) => {
    setComments(prevState => {
      if (prevState) {
        return comments.filter(comment => comment.id !== commentId);
      }

      return [];
    });
  };

  const handleCommentRemove = async (commentId: number) => {
    try {
      setIsRemoveError(false);
      commentRemove(commentId);
      await deleteComments(commentId);
    } catch {
      setIsRemoveError(true);

      setTimeout(() => {
        setIsRemoveError(false);
      }, 2000);
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

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!isLoading && !hasError && (
            !comments.length
              ? (
                <>
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>

                  {!buttonHidden && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setButtonHidden(true)}
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

                  {!buttonHidden && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setButtonHidden(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )
          )}
        </div>

        {buttonHidden && (
          <NewCommentForm postId={id} onAddComment={handleAddComment} />
        )}

        {removeError && (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>
        )}
      </div>
    </div>
  );
};
