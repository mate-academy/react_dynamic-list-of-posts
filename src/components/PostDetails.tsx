import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../api/PostsApi';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [isCommentFormOpen, setIsCommentFormOpen] = React.useState(false);

  const handleDeleteComment = (comment: Comment) => {
    const commentsCopy = [...comments];

    setComments((prevComments) => (
      prevComments.filter(({ id }) => id !== comment.id)
    ));

    deleteComment(comment.id)
      .catch(() => {
        setComments(commentsCopy);
        setError(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setComments([]);
      setIsCommentFormOpen(false);
    };
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!error && !isLoading && !comments.length) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
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
                      onClick={() => handleDeleteComment(comment)}
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

          {(!isLoading && !isCommentFormOpen) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormOpen && (
          <NewCommentForm
            postId={post.id}
            setError={setError}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
