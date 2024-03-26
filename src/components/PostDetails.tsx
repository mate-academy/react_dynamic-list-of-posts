import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsForm, setIsCommentsForm] = useState(false);

  const noComments = !comments.length && !commentsLoading && !commentsError;

  useEffect(() => {
    setComments([]);
    setIsCommentsForm(false);
    setCommentsLoading(true);

    getComments(post.id)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
        setCommentsError(false);
      })
      .catch(() => setCommentsError(true))
      .finally(() => setCommentsLoading(false));
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
          {commentsLoading && <Loader />}

          {commentsError && !commentsLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!noComments && !commentsLoading && !commentsError && (
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

          {!isCommentsForm && !commentsLoading && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentsForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentsForm && !commentsError && (
          <NewCommentForm
            postId={post.id}
            setComments={setComments}
            setCommentsError={setCommentsError}
          />
        )}
      </div>
    </div>
  );
};
