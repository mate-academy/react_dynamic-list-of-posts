import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formShown, setFormShown] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setFormShown(null);
    client
      .get<Comment[]>(`/comments?postId=${selectedPost?.id}`)
      .then(commentsFromServer => setComments(commentsFromServer))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [selectedPost.id]);

  const { id, title, body } = selectedPost;

  const handleDelete = (commentId: number) => {
    client
      .delete(`/comments/${commentId}`)
      .then(() =>
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        ),
      );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !loading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !loading && (
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

          {formShown !== selectedPost.id && !loading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormShown(selectedPost.id)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formShown === selectedPost.id && (
          <NewCommentForm postId={selectedPost.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
