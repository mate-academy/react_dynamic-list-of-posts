import React, { useState } from 'react';
import { Loader } from './Loader';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

type Props = {
  isLoader: boolean;
  errorComments: boolean;
  openCommentForm: boolean;
  commentsList: Comment[];
  postSelect: Post | undefined;
  onCommentsList: (commen: Comment | number) => void;
  onOpenCommentForm: (styte: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  errorComments,
  isLoader,
  openCommentForm,
  commentsList,
  postSelect,
  onOpenCommentForm,
  onCommentsList,
}) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [errorPost, setErrorPost] = useState(false);

  const handleOnSubmit = ({ email, body, name }: CommentData) => {
    setIsFormLoading(true);

    client
      .post<Comment>('/comments', { email, body, name, postId: postSelect?.id })
      .then(comment => onCommentsList(comment))
      .catch(() => setErrorPost(true))
      .finally(() => setIsFormLoading(false));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${postSelect?.id}: ${postSelect?.title}`}
        </h2>

        <p data-cy="PostBody">{postSelect?.body}</p>
      </div>

      <div className="block">
        {isLoader && <Loader />}

        {!isLoader && (
          <>
            {(!errorComments || errorPost) && commentsList.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {(errorComments || errorPost) && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!errorPost && <p className="title is-4">Comments:</p>}

            {commentsList.map(comment => (
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
                    onClick={() => onCommentsList(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

            {!openCommentForm && !errorPost && !errorComments && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => onOpenCommentForm(!openCommentForm)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {openCommentForm && (
        <NewCommentForm onSubmit={handleOnSubmit} loaderForm={isFormLoading} />
      )}
    </div>
  );
};
