import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ShowError } from '../types/ShowErrors';
import {
  commentsFromServer,
  createCommentOnServer,
  deleteCommentOnServer,
} from '../api/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Prop = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Prop> = ({ selectedPost }) => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<ShowError | null>(null);
  const [showWritingComments, setShowWritingComments] = useState(true);
  const [showFormComment, setShowFormComment] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const createComment = (name: string, email: string, comment: string) => {
    createCommentOnServer(selectedPost.id, name, email, comment)
      .then(newComment => setComments([...comments, newComment]))
      .catch(() => setError(ShowError.error))
      .finally(() => {

      });
  };

  const deleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  useEffect(() => {
    setShowWritingComments(true);
    setShowFormComment(false);

    setError(null);
    setLoader(true);

    commentsFromServer(selectedPost.id)
      .then(newComments => {
        if (newComments.length === 0) {
          setError(ShowError.commentsWarning);
        }

        setComments(newComments);
      })
      .catch(() => setError(ShowError.error))
      .finally(() => setLoader(false));
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">
          {selectedPost.body}
        </p>
      </div>

      <div className="block">
        {loader && <Loader />}

        {error
          && error === ShowError.error
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

        {error
          && error === ShowError.commentsWarning
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {error}
            </p>
          )}

        {!error && <p className="title is-4">Comments:</p>}

        {comments.map(comment => (
          <article
            key={selectedPost.id + comment.id}
            className="message is-small"
            data-cy="Comment"
          >
            <div className="message-header">
              <a href={`${comment.email}`} data-cy="CommentAuthor">
                {comment.name}
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
                onClick={() => {
                  deleteComment(comment.id);
                  deleteCommentOnServer(comment.id);
                }}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {showWritingComments
          && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                setShowWritingComments(false);
                setShowFormComment(true);
              }}
            >
              Write a comment
            </button>
          )}

        {showFormComment && <NewCommentForm createComment={createComment} />}

      </div>
    </div>
  );
};
