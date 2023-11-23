/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deletePostComment, getPostComments } from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [formOpened, setFormOpened] = useState(false);
  const [loadProcessing, setLoadProcessing] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [commentDeletionError, setCommentDeletionError] = useState(false);

  useEffect(() => {
    setFormOpened(false);
    setComments([]);
    setCommentsError(false);
    setLoadProcessing(true);
    setCommentDeletionError(false);

    getPostComments(id)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => {
        setLoadProcessing(false);
        setTimeout(() => {
          setCommentsError(false);
        }, 3000);
      });
  }, [id]);

  const handleDelete = (id: number) => {
    setComments((prevComments: Comment[]) => {
      const copy = [...prevComments];
      const index = copy.findIndex(comment => comment.id === id);

      copy.splice(index, 1);

      return copy;
    });

    deletePostComment(id)
      .catch(() => setCommentDeletionError(true))
      .finally(() => {
        setTimeout(() => {
          setCommentDeletionError(false);
        }, 3000);
      });
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
          {loadProcessing && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !loadProcessing && !commentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.length > 0 && comments.map(comment => (
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
              <div
                className="message-body"
                data-cy="CommentBody"
              >
                {comment.body}
              </div>
            </article>
          ))}

          {commentDeletionError && (
            <div
              className="notification is-danger"
              data-cy="PostsLoadingError"
            >
              Something went wrong!
            </div>
          )}

          {!formOpened && !loadProcessing && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formOpened && (
          <NewCommentForm
            postId={id}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
