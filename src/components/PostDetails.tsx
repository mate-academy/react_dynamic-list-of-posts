import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../services/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { title, body, id } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [writeCommentButton, setWriteCommentButton] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getComments(id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    deleteComment(commentId);
  };

  const handleWriteCommentClick = () => {
    setWriteCommentButton(true);
    setCurrentPostId(id);
  };

  useEffect(() => {
    if (writeCommentButton && currentPostId !== id) {
      setWriteCommentButton(false);
    }
  }, [id, currentPostId, writeCommentButton]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !hasError && !loading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !hasError && !loading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
              ))}
            </>
          )}

          {!writeCommentButton && !loading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeCommentButton && !hasError && (
          <NewCommentForm setComments={setComments} postId={id} />
        )}
      </div>
    </div>
  );
};
