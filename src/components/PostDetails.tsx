import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comment';
import { Comment } from '../types/Comment';

type Props = {
  openPostId: number | null;
  posts: Post[];
  isLoading: boolean;
  errorMessage: string;
  setIsLoading: (load: boolean) => void;
  setErrorMessage: (error: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  openPostId,
  posts,
  isLoading,
  errorMessage,
  setIsLoading,
  setErrorMessage,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const post = posts.find(p => p.id === openPostId);

  useEffect(() => {
    setIsAddFormOpen(false);

    if (!openPostId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    getComments(openPostId)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [openPostId, setErrorMessage, setIsLoading]);

  const handleDelete = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    deleteComment(commentId).catch(() =>
      setErrorMessage('Cant delete a comment'),
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        <Loader isLoading={isLoading} />

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && comments.length < 1 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && comments.length > 0 && (
          <p className="title is-4">Comments:</p>
        )}

        {comments.map(comment => {
          return (
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
                  onClick={() => handleDelete(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          );
        })}

        {!isAddFormOpen && !isLoading && !errorMessage && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsAddFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isAddFormOpen && (
        <NewCommentForm
          post={post}
          setErrorMessage={setErrorMessage}
          setComments={setComments}
        />
      )}
    </div>
  );
};
