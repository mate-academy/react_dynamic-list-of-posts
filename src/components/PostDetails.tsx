import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { getComment, deleteComment } from '../api/ApiMethods';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  openPost: Post | null,
  setOpenForm: (v: boolean) => void,
  openForm: boolean,
};

export const PostDetails: React.FC<Props> = ({
  openPost,
  setOpenForm,
  openForm,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteComments = (comId: number) => {
    deleteComment(comId)
      .then(() => {
        const updatePostComments = [...postComments];
        const index = updatePostComments.findIndex(com => com.id === comId);

        updatePostComments.splice(index, 1);
        setPostComments(updatePostComments);
      })
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    if (openPost) {
      setLoading(true);
      setHasError(false);

      getComment(openPost.id)
        .then(PostComments => setPostComments(PostComments))
        .catch(() => setHasError(true))
        .finally(() => setLoading(false));
    }
  }, [openPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${openPost?.id}: ${openPost?.title}`}</h2>

          <p data-cy="PostBody">{openPost?.body}</p>
        </div>

        {!hasError && (
          <div className="block">
            {loading ? (
              <Loader />
            ) : (
              <>
                {postComments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>
                    {postComments.map((com) => (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={com.id}
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${com.email}`}
                            data-cy="CommentAuthor"
                          >
                            {com.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteComments(com.id)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {com.body}
                        </div>
                      </article>
                    ))}
                  </>
                )}

                {!openForm && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setOpenForm(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {openForm && (
          <NewCommentForm
            openPost={openPost}
            setPostComments={setPostComments}
            setHasError={setHasError}
            setOpenForm={setOpenForm}
          />
        )}
      </div>
    </div>
  );
};
