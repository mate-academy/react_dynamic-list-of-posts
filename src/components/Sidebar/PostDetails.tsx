import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

interface PostDetailsProps {
  selectedPost: Post | null;
}

export const PostDetails = ({ selectedPost }: PostDetailsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);
  const [isVisibleButtonWriteComment, setIsVisibleButtonWriteComment] =
    useState(true);

  useEffect(() => {
    if (selectedPost === null) {
      return;
    }

    setComments([]);
    setIsCommentsLoading(true);
    setCommentsLoadingError(false);

    setIsNewCommentForm(false);
    setIsVisibleButtonWriteComment(true);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(data => {
        setComments(data);
      })
      .catch(() => {
        setCommentsLoadingError(true);
      })
      .finally(() => {
        setIsCommentsLoading(false);
      });
  }, [selectedPost]);

  const addComment = (comment: Comment) => {
    setComments(currentComments => [...currentComments, comment]);
  };

  const hiddenButtonWrite = () => {
    setIsVisibleButtonWriteComment(false);
  };

  const addComentBlock = () => {
    setIsNewCommentForm(true);
  };

  const handleButtonWrite = () => {
    hiddenButtonWrite();
    addComentBlock();
  };

  // const deleteComment = (commentId: number) => {
  //   client.delete(`/comments/${commentId}`).then(() => {
  //     setComments(comments.filter(comment => comment.id !== commentId));
  //   });
  // };
  const deleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`).then(() => {
      //  Використовуємо функціональне оновлення стейту
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    });
  };

  if (!selectedPost) {
    return null;
  }

  const shouldShowWriteButton =
    isVisibleButtonWriteComment && !isCommentsLoading && !commentsLoadingError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {commentsLoadingError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : isCommentsLoading ? (
          <Loader />
        ) : (
          <>
            {comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {comments.length > 0 &&
              comments.map(comment => (
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
                      onClick={() => deleteComment(comment.id)}
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
        {shouldShowWriteButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleButtonWrite}
          >
            Write a comment
          </button>
        )}
      </div>

      {isNewCommentForm && (
        <NewCommentForm addComment={addComment} postId={selectedPost.id} />
      )}
    </div>
  );
};
