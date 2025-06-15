import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import * as clientApi from '../api/users';

interface Props {
  selectedPost: Post | null;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<null | Comment[]>(null);
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setComments(null);
    setIsError(false);
    setIsLoading(true);
    setIsFormShown(false);

    clientApi
      .getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  const handleDelete = (id: number) => {
    clientApi.deleteComment(id);

    setComments(cur => (cur ? cur.filter(comment => comment.id !== id) : null));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : (
            comments && (
              <>
                {!comments.length ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => {
                      return (
                        <article
                          key={comment.id}
                          className="message is-small"
                          data-cy="Comment"
                        >
                          <div className="message-header">
                            <a
                              href={`mailto:${comment.email}`}
                              data-cy="CommentAuthor"
                            >
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

                          <div className="message-body" data-cy="CommentBody">
                            {comment.body}
                          </div>
                        </article>
                      );
                    })}
                  </>
                )}

                {!isFormShown && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsFormShown(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )
          )}
        </div>

        {isFormShown && selectedPost && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
            setIsError={setIsError}
            setIsFormShown={setIsFormShown}
          />
        )}
      </div>
    </div>
  );
};
