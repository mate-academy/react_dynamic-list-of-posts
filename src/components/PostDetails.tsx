import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';

type Props = {
  selectedPost: Post;
  errors: Error;
  onError: (error: (prevError: Error) => Error) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  errors,
  onError,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);

  useEffect(() => {
    setIsCommentsLoading(true);

    client.get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => onError(error => ({
        ...error,
        comments: true,
      })))
      .finally(() => setIsCommentsLoading(false));

    return () => {
      setIsAddComment(false);
    };
  }, [selectedPost.id]);

  const handleDeleteComment = (id: number) => {
    client.delete(`/comments/${id}`);
    setComments((current) => (
      current.filter(comment => comment.id !== id)
    ));
  };

  if (isCommentsLoading) {
    return <Loader />;
  }

  const { id: postId, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postId}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">

          {errors.comments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {comments.map(({
            name,
            email,
            body: commentBody,
            id: commentId,
          }) => (
            <article
              key={commentId}
              className="message is-small"
              data-cy="Comment"
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
                  onClick={() => handleDeleteComment(commentId)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {commentBody}
              </div>
            </article>
          ))}

          {isAddComment ? (
            <NewCommentForm
              postId={postId}
              errors={errors}
              onSetComments={setComments}
              onError={onError}
            />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
