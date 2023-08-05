import React, { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  deleteComment: (id: number) => Promise<unknown>;
  isWriting: boolean;
  setIsWriting: (value: boolean) => void;
  addComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  getComments: (postId: number) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  deleteComment,
  isWriting,
  setIsWriting,
  addComment,
  getComments,
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);

      getComments(selectedPost.id)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const validateComments = !isLoading && !isError;

  const handleDelete = (id: number) => {
    deleteComment(id)
      .catch(() => setIsError(true));
  };

  const handleAddComment = ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => {
    return addComment({
      postId,
      name,
      email,
      body,
    })
      .catch(() => setIsError(true));
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
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {validateComments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {validateComments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const {
                  email,
                  name,
                  body,
                  id,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a href={email} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isWriting && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriting && (
          <NewCommentForm
            addComment={handleAddComment}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
