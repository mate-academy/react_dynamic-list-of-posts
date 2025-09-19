import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

interface Props {
  currentPost: Post;
  showForm: boolean;
  onShowForm: (v: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  currentPost,
  showForm,
  onShowForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    client
      .get<Comment[]>('/comments?postId=' + currentPost.id)
      .then(setComments)
      .catch(() => setError('Something went wrong!'))
      .finally(() => setLoading(false));
  }, [currentPost]);

  if (!currentPost) {
    return null;
  }

  function deleteComment(commentId: number) {
    const reservComments = [...comments];

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    client.delete('/comments/' + commentId).catch(() => {
      setComments(reservComments);
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${currentPost.id}: ${currentPost.title}`}</h2>

        <p data-cy="PostBody">{currentPost.body}</p>
      </div>

      <div className="block">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        ) : (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
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

            {!showForm && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => onShowForm(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {showForm && (
        <NewCommentForm onComments={setComments} currentPost={currentPost} />
      )}
    </div>
  );
};
