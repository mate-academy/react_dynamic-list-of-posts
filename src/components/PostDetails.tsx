import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useGetComments } from '../hooks/useGetComments';
import { Comment } from '../types/Comment';
import { useDeleteComment } from '../hooks/useDeleteComment';

interface Props {
  activePost: Post | null;
}

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const { id, title, body } = activePost ?? {};
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormShown, setIsFormShown] = useState(false);
  const { getCommentsData, loading, loadingError } = useGetComments({
    setComments,
  });
  const { deleteComment } = useDeleteComment({ setComments });

  useEffect(() => {
    if (activePost?.id) {
      getCommentsData(activePost.id);
    }

    setIsFormShown(false);
  }, [activePost?.id]);

  const noCommentsContent = !(loadingError || loading || comments.length) && (
    <p className="title is-4" data-cy="NoCommentsMessage">
      No comments yet
    </p>
  );
  const isCommentsContent = !(loading || loadingError || !comments.length);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {loadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noCommentsContent}

          {isCommentsContent && (
            <>
              <p className="title is-4">Comments:</p>

              {!!comments.length &&
                comments.map(comment => (
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
          {!(loading || loadingError || isFormShown) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShown(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && <NewCommentForm setComments={setComments} />}
      </div>
    </div>
  );
};
