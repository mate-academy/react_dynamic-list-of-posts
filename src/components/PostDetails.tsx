import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments, postComment } from '../api/comments';
import { FormErrors } from '../types/types';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id, title, body } = post;

  const handleFormOpen = () => setIsFormOpened(true);

  const handleCommentAdd = async (
    name: string,
    email: string,
    text: string,
  ): Promise<FormErrors> => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();
    const errors: FormErrors = {
      sendError: false,
      nameError: !trimmedName,
      emailError: !trimmedEmail,
      textError: !trimmedText,
    };

    if (Object.values(errors).every(formError => !formError)) {
      try {
        const sentComment = await postComment({
          postId: id,
          name: trimmedName,
          email: trimmedEmail,
          body: trimmedText,
        });

        setComments(prevComments => [...prevComments, sentComment]);
      } catch {
        errors.sendError = true;
      }
    }

    return errors;
  };

  const handleCommentDelete = async (commentId: number): Promise<boolean> => {
    let commentsBeforeDeletion: Comment[] = [];

    setComments(prevComments => {
      commentsBeforeDeletion = prevComments;

      return prevComments.filter(comment => comment.id !== commentId);
    });

    try {
      await deleteComment(commentId);

      return true;
    } catch {
      setComments(commentsBeforeDeletion);

      return false;
    }
  };

  const loadComments = async (postId: number) => {
    setIsLoading(true);
    setError(false);

    try {
      const loadedComments = await getPostComments(postId);

      setComments(loadedComments);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsFormOpened(false);
    loadComments(id);
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : (
            <>
              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <CommentsList
                  comments={comments}
                  onCommentDelete={handleCommentDelete}
                />
              )}

              {!isFormOpened && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleFormOpen}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isFormOpened && <NewCommentForm onCommentAdd={handleCommentAdd} />}
      </div>
    </div>
  );
};
