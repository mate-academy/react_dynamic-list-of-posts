import React, {
  useState, useEffect, ChangeEvent, useCallback, FormEvent,
} from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { SelectedPost } from '../types/SelectedPost';
import { Comment, CommentData } from '../types/Comment';
import { createComment, getComments, deleteComment } from '../api/comments';
import { FieldErrors } from '../types/Errors';

interface Props {
  selectedPost: SelectedPost | null
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<CommentData>({
    name: '',
    email: '',
    body: '',
  });
  const [fieldErrors, setFieldError] = useState<FieldErrors>({
    name: false,
    email: false,
    body: false,
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const clearFormField = useCallback(() => {
    setNewComment({
      name: '',
      email: '',
      body: '',
    });

    setFieldError({
      name: false,
      email: false,
      body: false,
    });
  }, [comments]);

  const newCommentId = useCallback(() => {
    const commentIds = comments.map(comment => comment.id);

    return (Math.max(...commentIds) + 1);
  }, [comments]);

  const isEmailValid = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email.trim());
  }, []);

  const validateFields = useCallback((
    innerNewComment: CommentData, innerFieldErrors: FieldErrors,
  ) => {
    const { name, email, body } = innerNewComment;
    const newFieldErrors = { ...innerFieldErrors };

    if (!name.trim()) {
      newFieldErrors.name = true;
    }

    if (!isEmailValid(email)) {
      newFieldErrors.email = true;
    }

    if (!body.trim()) {
      newFieldErrors.body = true;
    }

    return setFieldError(newFieldErrors);
  }, [isEmailValid]);

  const addComment = useCallback(async (
    event: FormEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const { name, email, body } = newComment;

    if (!name.trim() || !isEmailValid(email) || !body.trim()) {
      validateFields(newComment, fieldErrors);
    } else if (selectedPost?.id) {
      const newCommentObject: Comment = {
        id: newCommentId(),
        postId: selectedPost.id,
        name: newComment.name.trim(),
        email: newComment.email.trim(),
        body: newComment.body.trim(),
      };

      setComments([...comments, newCommentObject]);

      try {
        await createComment(newCommentObject);
      } catch (innerError) {
        setError(true);
      } finally {
        setNewComment({ ...newComment, body: '' });
      }
    }
  }, [newComment, fieldErrors, selectedPost, comments]);

  const imputHandler = useCallback((
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (value.length === 0) {
      setFieldError({ ...fieldErrors, [name]: true });
    } else {
      setFieldError({ ...fieldErrors, [name]: false });
    }

    return setNewComment({ ...newComment, [name]: value });
  }, [fieldErrors]);

  const deleteCommentHandler = useCallback(async (
    commentId: number,
    event,
  ) => {
    event.preventDefault();
    setComments(comments.filter(comment => comment.id !== commentId));

    try {
      await deleteComment(commentId);
    } catch (innerError) {
      throw new Error('Failed to delete the comment. Please try again later.');
    }
  }, [comments]);

  useEffect(() => {
    setIsLoading(true);

    const Comments = async () => {
      if (selectedPost) {
        try {
          const innerComments = await getComments(selectedPost.id);

          setComments(innerComments);
        } catch (innerError) {
          setError(true);
        } finally {
          setIsLoading(false);
          setIsWriting(false);
        }
      }
    };

    Comments();
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {error
            && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong!
              </div>
            )}

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {comments.length !== 0 ? (
                <div>
                  <p className="title is-4">Comments:</p>
                  {comments.map((comment) => {
                    const { name, body, id } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={id}
                      >
                        <div className="message-header">
                          <a
                            href="mailto:misha@mate.academy"
                            data-cy="CommentAuthor"
                          >
                            {name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={(event) => deleteCommentHandler(id, event)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {body}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!isWriting && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className={classNames('button', 'is-link')}
                  onClick={() => setIsWriting(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {(isWriting && !isLoading)
          && (
            <NewCommentForm
              onCommentData={imputHandler}
              onAddComment={addComment}
              onClearForm={clearFormField}
              newComment={newComment}
              fieldErrors={fieldErrors}
              isLoading={isLoading}
            />
          )}
      </div>
    </div>
  );
};
