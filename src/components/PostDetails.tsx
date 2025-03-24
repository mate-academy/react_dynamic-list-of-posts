import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [commentForm, setCommentForm] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setCommentForm(false);
      setError(false);
      setLoading(true);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [selectedPost]);

  const handleDelete = (id: number) => {
    setLoading(true);
    setError(false);

    setComments(prev => prev.filter(comment => comment.id !== id));

    deleteComment(id)
      .catch(() => {
        setError(true);
        setComments(prev => [
          ...prev,
          { id, postId: selectedPost.id, name: '', email: '', body: '' },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{selectedPost.title}</h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}
        {error && !loading && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!error && !loading && (
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
          </>
        )}
      </div>

      {selectedPost && commentForm ? (
        <NewCommentForm postId={selectedPost.id} setComments={setComments} />
      ) : (
        !loading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setCommentForm(true)}
          >
            Write a comment
          </button>
        )
      )}
    </div>
  );
};
