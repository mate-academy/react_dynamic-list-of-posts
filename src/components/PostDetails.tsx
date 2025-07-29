import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { postComment, deleteComment } from '../api/comments';

type Props = {
  selectedPost: Post | undefined;
  commentsByPost: Comment[];
  isLoading: boolean;
  isLoadError: boolean;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  commentsByPost,
  isLoading,
  isLoadError,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [comment, setComment] = useState<Comment[]>(commentsByPost);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    setComment(commentsByPost);
  }, [commentsByPost]);

  useEffect(() => {
    setIsFormVisible(false);
  }, [selectedPost.id]);

  if (!selectedPost) {
    return null;
  }

  const addComment = (data: CommentData): Promise<void> => {
    setMessageError(false);

    return postComment(data)
      .then(serverComment => {
        setComment(prev => [...prev, serverComment]);
      })
      .catch(() => {
        setMessageError(true);
      });
  };

  const deletedComment = (commentId: number) => {
    setMessageError(false);
    setDeleteTodoId(commentId);

    return deleteComment(commentId)
      .then(() => {
        setComment(currentComments =>
          currentComments.filter(comm => comm.id !== commentId),
        );
      })
      .catch(() => {
        setMessageError(true);
      })
      .finally(() => {
        setDeleteTodoId(null);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        {isLoading && <Loader />}

        {!isLoading && (messageError || isLoadError) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        <div className="block">
          {comment.length === 0 && !isLoading && !isLoadError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comment.length > 0 && !isLoading && !messageError && (
            <>
              <p className="title is-4">Comments:</p>

              {comment.map(({ id, name, email, body }) => (
                <article
                  key={id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => deletedComment(id)}
                      disabled={deleteTodoId === id}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isFormVisible && !isLoading && !isLoadError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}

          {isFormVisible && !messageError && (
            <NewCommentForm addComment={addComment} postId={selectedPost.id} />
          )}
        </div>
      </div>
    </div>
  );
};
