import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [creating, setCreating] = useState(false);
  const hasNoComments = !loading && !hasError && comments.length === 0;

  useEffect(() => {
    if (currentPost) {
      setLoading(true);

      client.get<Comment[]>(`/comments?postId=${currentPost?.id}`)
        .then(res => setComments(res))
        .catch(() => setHasError(true))
        .finally(() => setLoading(false));
    }
  }, [currentPost]);

  const handleDelete = (id: number) => {
    setComments(prev => prev?.filter(item => item.id !== id) || null);
    client.delete(`/comments/${id}`);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {currentPost?.body}
          </p>
        </div>

        <div className="block">
          {loading && (
            <Loader />
          )}

          {!loading && hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && !!comments.length && (
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

          {!loading && !creating && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCreating(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {currentPost && !loading && creating && (
          <NewCommentForm
            postId={currentPost?.id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
