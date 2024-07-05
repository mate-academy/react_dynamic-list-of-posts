import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsList } from './CommentsList';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments, postComment } from '../api/comments';
import { Notification } from './Notification';
import { FormError } from '../types/errors';
import { wentWrongMessage } from '../utils/strings/messages';

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
  ) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedText = text.trim();

    if (trimmedName && trimmedEmail && trimmedText) {
      try {
        const sentComment = await postComment({
          postId: id,
          name: trimmedName,
          email: trimmedEmail,
          body: trimmedText,
        });

        setComments(prevComments => [...prevComments, sentComment]);
      } catch {
        throw new FormError('Unable to add a comment!!!', true);
      }
    } else {
      throw new FormError(
        'Input fields are not filled!!!',
        false,
        !trimmedName,
        !trimmedEmail,
        !trimmedText,
      );
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    let commentsBeforeDeletion: Comment[] = [];

    setComments(prevComments => {
      commentsBeforeDeletion = prevComments;

      return prevComments.filter(comment => comment.id !== commentId);
    });

    try {
      await deleteComment(commentId);
    } catch {
      setComments(commentsBeforeDeletion);

      throw new Error('Unable to delete a comment!!!');
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

  let sidebarContent: React.JSX.Element;

  if (isLoading) {
    sidebarContent = <Loader />;
  } else if (error) {
    sidebarContent = (
      <Notification message={wentWrongMessage} error dataCy="CommentsError" />
    );
  } else {
    let loadedComments: React.JSX.Element;

    if (!comments.length) {
      loadedComments = (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    } else {
      loadedComments = (
        <CommentsList
          comments={comments}
          onCommentDelete={handleCommentDelete}
        />
      );
    }

    sidebarContent = (
      <>
        {loadedComments}

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
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">{sidebarContent}</div>

        {isFormOpened && <NewCommentForm onCommentAdd={handleCommentAdd} />}
      </div>
    </div>
  );
};
