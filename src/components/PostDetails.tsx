import React, { useEffect, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { addComment, deleteComment, getComments } from '../utils/serverHelper';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null;
  postSelected: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
  postSelected,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isNewFormVisible, setIsNewFormVisible] = useState(false);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [isCommentErrorVisible, setIsCommentErrorVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);

  const loadComments = async (selectedPost: Post) => {
    setIsLoaderVisible(true);

    try {
      const commentsFromServer = await getComments(selectedPost.id);

      setComments(commentsFromServer);
      setIsCommentErrorVisible(false);
      setIsWriteCommentVisible(true);
    } catch {
      setIsCommentErrorVisible(true);
    } finally {
      setIsLoaderVisible(false);
    }
  };

  useEffect(() => {
    if (post !== null) {
      loadComments(post);
      setIsNewFormVisible(false);
    }
  }, [post]);

  const handleOnDelete = (id: number) => {
    if (post === null) {
      return;
    }

    try {
      deleteComment(id);
      const preparedComments = comments.filter((comment) => comment.id !== id);

      setComments(preparedComments);
    } catch {
      setHasError(true);
    }
  };

  const handleOnAdd = async (newComment: CommentData) => {
    const preparedComment = { ...newComment, postId: post?.id };

    setIsNewCommentLoading(true);

    try {
      const comment = await addComment(preparedComment);

      setComments((prev) => [...prev, comment]);
    } catch {
      setHasError(true);
    } finally {
      setIsNewCommentLoading(false);
    }
  };

  const handleShowNewForm = () => {
    setIsNewFormVisible(true);
  };

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  const isCommentsVisible = comments.length > 0
  && !isLoaderVisible && !isCommentErrorVisible;
  const isNoComments = comments.length === 0
  && !isLoaderVisible && !isCommentErrorVisible;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {isLoaderVisible && <Loader />}

        {isCommentErrorVisible && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
          </div>
        )}

        {isNoComments && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsVisible && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map((comment) => (
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
                    onClick={() => {
                      handleOnDelete(comment.id);
                    }}
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

        {isNewFormVisible && (
          <NewCommentForm
            handleOnAdd={handleOnAdd}
            isNewCommentLoading={isNewCommentLoading}
            postSelected={postSelected}
          />
        )}

        {isWriteCommentVisible && !isNewFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleShowNewForm}
          >
            Write a comment
          </button>
        )}
      </div>
    </div>
  );
};
