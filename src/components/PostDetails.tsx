import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsError(false);
    async function loadComments() {
      try {
        setIsLoading(true);
        setComments(await getComments(post.id));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    const previousComments = comments;

    setComments(prev => prev.filter(comment => comment.id !== commentId));

    async function removeComment() {
      try {
        await deleteComment(commentId);
      } catch {
        setComments(previousComments);
      }
    }

    removeComment();
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{post.title}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isError &&
            (comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
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
            ))}
          {!isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            postId={post.id}
            addCommentToList={(comment: Comment) =>
              setComments(prev => [...prev, comment])
            }
          />
        )}
      </div>
    </div>
  );
};
