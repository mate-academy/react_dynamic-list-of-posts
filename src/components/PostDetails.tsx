import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { addComment, getComments, removeComment } from '../api/api';
import { Comment, CommentData } from '../types/Comment';

export type PostDetailsProps = {
  postId: (Post)
};

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const { id, title, body } = postId;
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentsListerror, setCommentsListerror] = useState<boolean>(false);
  const [openCommentForm, setOpenCommentForm] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    setComments(() => null);
    setOpenCommentForm(() => false);

    getComments(id)
      .then((response) => {
        setComments(() => response);
        setCommentsListerror(false);
      })
      .catch(() => {
        setCommentsListerror(true);
        setComments(() => []);
      });
  }, [id]);

  const handleRemoveComment = (commentId: number) => {
    setComments((prev) => prev?.filter(
      (item) => item.id !== commentId,
    ) ?? null);

    removeComment(commentId);
  };

  const handleAddComment = (newComment: CommentData) => {
    setSending(true);

    addComment({ ...newComment, postId: id })
      .then((response) => {
        setComments((prev) => (prev !== null ? [...prev, response]
          : [response]));
      }).finally(() => setSending(false));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {!commentsListerror && !comments && (<Loader />)}

          {commentsListerror && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!commentsListerror && comments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment) => (
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
                      onClick={() => handleRemoveComment(comment.id)}
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

          {!openCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openCommentForm && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            sending={sending}
          />
        )}
      </div>
    </div>
  );
};
