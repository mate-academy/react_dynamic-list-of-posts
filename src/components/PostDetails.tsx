import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import {
  addingCommentRequest,
  deletingCommentRequest,
} from '../utils/apiRequests';

type Props = {
  selectedPost: Post,
  comments: Comment[],
  setComments: (posts: Comment[]) => void,
  areCommentsLoading: boolean,
  hasCommentsLoadingError: boolean,
  setHasCommentsLoadingError: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  areCommentsLoading,
  hasCommentsLoadingError,
  setHasCommentsLoadingError,
}) => {
  const [showForm, setShowForm] = useState(false);

  const addComment = (data: any) => {
    return addingCommentRequest(data, selectedPost.id)
      .then(result => setComments([...comments, result]))
      .catch(() => {
        setHasCommentsLoadingError(true);
        throw new Error();
      });
  };

  const deleteComment = (id: number) => {
    setHasCommentsLoadingError(false);

    deletingCommentRequest(id)
      .then(() => {
        if (comments) {
          setComments(comments.filter(comment => {
            return comment.id !== id;
          }));
        }
      })
      .catch(() => setHasCommentsLoadingError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
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
          {areCommentsLoading && <Loader />}

          {hasCommentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!areCommentsLoading && !hasCommentsLoadingError
            && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!areCommentsLoading && !hasCommentsLoadingError
            && comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
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
                      onClick={() => deleteComment(comment.id)}
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

          {!areCommentsLoading && !showForm && (
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

        {showForm && (
          <NewCommentForm
            onAdd={addComment}
          />
        )}
      </div>
    </div>
  );
};
