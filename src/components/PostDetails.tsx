import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import * as comentService from '../api/coments';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  isComentsLoaded: boolean;
  errorMessage: string;
  errorLoadComents: boolean;
  setComments: (callback: (currentTodos: Comment[]) => Comment[]) => void;
  setErrorLoadComents: (el: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isComentsLoaded,
  errorMessage,
  errorLoadComents,
  setComments,
  setErrorLoadComents,
}) => {
  const arrayLength = comments?.length;
  const [writeFormIsActive, setWriteFormIsActive] = useState(false);

  useEffect(() => {
    setWriteFormIsActive(false);
  }, [selectedPost]);

  const handleComentButton = () => {
    setWriteFormIsActive(true);
  };

  const deletingComent = (comentId: number) => {
    const updatedComents =
      comments.filter((cm: Comment) => cm.id !== comentId) || [];

    setComments(() => updatedComents);

    comentService.deleteComments(comentId);
  };

  const handleDeleteButton = (comentId: number) => {
    deletingComent(comentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isComentsLoaded ? (
            <Loader />
          ) : errorLoadComents ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          ) : arrayLength ? (
            <>
              <p className="title is-4">Comments:</p>
              {comments?.map(comment => {
                const { id, email, name, body } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
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
                        onClick={() => {
                          handleDeleteButton(id);
                        }}
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
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isComentsLoaded && !writeFormIsActive && !errorLoadComents && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => {
                handleComentButton();
              }}
            >
              Write a comment
            </button>
          )}
        </div>
        {writeFormIsActive && !errorLoadComents && (
          <NewCommentForm
            post={selectedPost}
            setComments={setComments}
            setErrorLoadComents={setErrorLoadComents}
          />
        )}
      </div>
    </div>
  );
};
