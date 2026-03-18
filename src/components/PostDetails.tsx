import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/api-comments';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isActiveForm, setIsActiveForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  async function handleCommentLoad() {
    setIsError(false);
    setLoading(true);
    setIsActiveForm(false);

    try {
      setComments(await getComments(post.id));
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleCommentDelete(commentId: Comment['id']) {
    try {
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
      await deleteComment(commentId);
    } catch {
      setIsError(true);
      await handleCommentLoad();
    }
  }

  useEffect(() => {
    handleCommentLoad();
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {isError && !loading && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {comments.length === 0 && !loading && !isError && (
          <>
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          </>
        )}

        {comments.length !== 0 && !loading && !isError && (
          <>
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
                    onClick={() => handleCommentDelete(comment.id)}
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

        {!loading && !isError && !isActiveForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsActiveForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isActiveForm && (
        <NewCommentForm
          post={post}
          setComments={setComments}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};
