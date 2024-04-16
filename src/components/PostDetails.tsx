import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/getComments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState(false);
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setComments([]);
    setCommentForm(false);
    setLoadind(true);

    getComments(post.id)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoadind(false));
  }, [post]);

  const handleDelete = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId).catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && !loading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

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

          {!commentForm && !loading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {commentForm && !error && (
          <NewCommentForm
            postId={post.id}
            setComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
