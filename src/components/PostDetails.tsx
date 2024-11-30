import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostComments, postComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState('');
  const { id, title, body } = post;

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!post.id) {
      return;
    }

    setLoading(true);
    setShowForm(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasError('Something went wrong'))
      .finally(() => setLoading(false));
  }, [post]);

  const addComment = (newComment: CommentData & { postId: number }) => {
    return postComment(newComment).then(createdComment => {
      setComments(curr => [...curr, createdComment]);
    });
  };

  const removeComment = (commentId: number) => {
    return deleteComment(commentId).then(() =>
      setComments(curr => curr.filter(comment => comment.id !== commentId)),
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {!loading && hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {hasError}
            </div>
          )}

          {!loading && !hasError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && !hasError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const { name, email, body: content } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => removeComment(comment.id)}
                      >
                        {/* delete button */}
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {content}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!showForm && !loading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && <NewCommentForm post={post} addComment={addComment} />}
      </div>
    </div>
  );
};
