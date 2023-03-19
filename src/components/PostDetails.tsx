import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getComments, deleteComment, addComment } from '../api/comments';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAddingError, setAddingError] = useState(false);
  const [isAddingLoading, setAddingLoadig] = useState(false);
  const [commentField, setCommentField] = useState('');
  const [commentFieldError, setCommentFieldError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      try {
        const commentsFromServer = await getComments(post.id);

        setComments(commentsFromServer);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [post]);

  useEffect(() => {
    const handlePostButtonClick = () => {
      setFormOpen(false);
    };

    const buttons = document.querySelectorAll('[data-cy="PostButton"]');

    buttons.forEach(button => {
      button.addEventListener('click', handlePostButtonClick);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handlePostButtonClick);
      });
    };
  }, [isFormOpen]);

  const removeComment = async (id: number) => {
    setError(false);

    let temporaryComments: Comment[];

    setComments(prev => {
      temporaryComments = prev;

      return prev.filter(comment => comment.id !== id);
    });

    try {
      await deleteComment(id);
    } catch {
      setError(true);
      setComments(() => temporaryComments);
    }
  };

  const addNewComment = useCallback(async (comment: CommentData) => {
    setAddingError(false);
    setAddingLoadig(true);

    try {
      const newCommentData = await addComment({
        ...comment,
        postId: post.id,
      });

      setComments(prev => {
        return [
          ...prev,
          newCommentData,
        ];
      });

      setCommentField('');
    } catch {
      setAddingError(true);
    } finally {
      setAddingLoadig(false);
    }
  }, []);

  const {
    id,
    title,
    body,
  } = post;

  const hasComments = comments.length > 0;

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

        {isLoading && (
          <Loader />
        )}

        {!isLoading && (
          <div className="block">
            {hasComments && (
              <p className="title is-4">Comments:</p>
            )}

            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!hasComments && !isError && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {comments.map(comment => {
              const {
                id: commentId,
                body: commentText,
                email,
                name,
              } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={commentId}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => removeComment(commentId)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {commentText}
                  </div>
                </article>
              );
            })}

            {!isFormOpen && !isError && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setFormOpen(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        )}
        {isFormOpen && !isError && (
          <NewCommentForm
            isLoading={isAddingLoading}
            isError={isAddingError}
            onSubmit={addNewComment}
            commentField={commentField}
            onCommentChange={setCommentField}
            commentFieldError={commentFieldError}
            setCommentError={setCommentFieldError}
          />
        )}
      </div>
    </div>
  );
};
