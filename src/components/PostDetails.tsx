import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentService from '../api/comment';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setLoadingComment(true);
    commentService
      .getComment(post.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => {
        setLoadingComment(false);
      });
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    commentService
      .deleteComment(commentId)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleChangeForm = () => {
    setOpenForm(!openForm);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>
          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {!error && loadingComment && <Loader />}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

          {comments.length > 0 &&
            comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.email}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          {comments.length === 0 && !loadingComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {openForm && (
            <NewCommentForm onAddComment={handleAddComment} postId={post.id} />
          )}

          {!loadingComment && !openForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleChangeForm}
            >
              Write a comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
