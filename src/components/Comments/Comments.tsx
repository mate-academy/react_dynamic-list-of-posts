import {
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { CommentData, IComment } from '../../types/IComment';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';

interface CommentsProps {
  postId: number;
}

export const Comments: FunctionComponent<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getCommentsFromServer = async () => {
      try {
        const loadComments = await getPostComments(postId);

        setComments(loadComments);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCommentsFromServer();
  }, [postId]);

  const handleAddComment = async (comment: CommentData) => {
    const newComment = {
      ...comment,
      postId,
    };

    try {
      const addedComment = await createComment(newComment);

      setComments(currentComments => [...currentComments, addedComment]);
    } catch (error) {
      setHasError(true);
      throw Error('Unable to add comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const tempComments = [...comments];

    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch (error) {
      setHasError(true);
      setComments(tempComments);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="block">
      {!comments.length
        ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )
        : (
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
      {!isVisible
        ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsVisible(true)}
          >
            Write a comment
          </button>
        )
        : (
          <NewCommentForm handleAddComment={handleAddComment} />
        )}
    </div>
  );
};
