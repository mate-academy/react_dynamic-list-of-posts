import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingCommentsError, setLoadingCommentsError] = useState(false);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    setLoadingComments(true);

    getComments(post.id.toString())
      .then(allComments => {
        setComments(allComments);
      })
      .catch(() => setLoadingCommentsError(true))
      .finally(() => setLoadingComments(false));
  }, [post.id]);

  const handleCommentDelete = (commentId: number) => {
    deleteComment(commentId.toString())
      .then(() => {
        setComments(currComments => {
          return currComments.filter(comment => comment.id !== commentId);
        });
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post.title}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">

          {loadingComments && <Loader />}

          {loadingCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0
            ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    key={comment.id}
                    data-cy="Comment"
                    className="message is-small"
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

          {!addComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setAddComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {addComment && (
          <NewCommentForm
            postId={post.id}
            onCommentAdd={setComments}
          />
        )}
      </div>
    </div>
  );
};
