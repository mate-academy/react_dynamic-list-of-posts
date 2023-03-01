import React, { useEffect, useState } from 'react';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { addComment, deleteComment, getComments } from '../utils/serverHelper';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post | null,
  postSelected: Post | null,
};

export const PostDetails: React.FC<Props> = ({
  post,
  postSelected,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false);
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  const [isVisibleNewForm, setIsVisibleNewForm] = useState(false);
  const [isVisibleWriteComment, setIsVisibleWriteComment] = useState(false);
  const [isVisibleCommentError, setIsVisibleCommentError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisibleEmptyCommentMessage,
    setIsVisibleEmptyCommentMessage] = useState(false);
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);

  const loadComments = async (selectedPost: Post) => {
    setIsVisibleLoader(true);
    setIsVisibleEmptyCommentMessage(false);
    setIsVisibleComments(false);

    try {
      const commentsFromServer = await getComments(selectedPost.id);

      setComments(commentsFromServer);
      setIsVisibleCommentError(false);
      setIsVisibleWriteComment(true);
      if (commentsFromServer.length === 0) {
        setIsVisibleEmptyCommentMessage(true);
      } else {
        setIsVisibleComments(true);
      }
    } catch {
      setIsVisibleCommentError(true);
    } finally {
      setIsVisibleLoader(false);
    }
  };

  useEffect(() => {
    if (post !== null) {
      loadComments(post);
      setIsVisibleNewForm(false);
    }
  }, [post]);

  const handleOnDelete = (id: number) => {
    if (post === null) {
      return;
    }

    try {
      deleteComment(id);
      const preparedComments = comments.filter(comment => comment.id !== id);

      if (preparedComments.length === 0) {
        setIsVisibleEmptyCommentMessage(true);
        setIsVisibleComments(false);
      } else {
        setIsVisibleComments(true);
        setIsVisibleEmptyCommentMessage(false);
      }

      setComments(preparedComments);
    } catch {
      setHasError(true);
    }
  };

  const handleOnAdd = async (newComment: CommentData) => {
    const preparedComment = { ...newComment, postId: post?.id };

    setIsLoadingNewComment(true);

    try {
      const comment = await addComment(preparedComment);

      setComments(prev => [...prev, comment]);
      setIsVisibleEmptyCommentMessage(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoadingNewComment(false);
    }
  };

  const handleShowNewForm = () => {
    setIsVisibleNewForm(true);
  };

  if (hasError) {
    return (
      <div
        className="notification is-danger"
        data-cy="CommentsError"
      >
        Something went wrong
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isVisibleLoader && <Loader />}

          {isVisibleCommentError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong!
            </div>
          )}

          {isVisibleEmptyCommentMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isVisibleComments && (
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

          {isVisibleNewForm && (
            <NewCommentForm
              handleOnAdd={handleOnAdd}
              isLoadingNewComment={isLoadingNewComment}
              // skipAllErrors={skipAllErrors}
              postSelected={postSelected}
            />
          )}

          {(isVisibleWriteComment && !isVisibleNewForm) && (
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
    </div>
  );
};
