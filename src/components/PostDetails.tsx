import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/post';
import { Comment as UserComment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setLoadingError(false);
    setIsFormVisible(false);
    setLoading(true);

    getComments(selectedPost.id)
      .then((commentsFromServer: UserComment[]) =>
        setComments(commentsFromServer),
      )
      .catch(() => setLoadingError(true))
      .finally(() => {
        setLoading(false);
      });
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {loading && <Loader />}

        {!loading && loadingError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!loading && !loadingError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!loading && !loadingError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
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
                    onClick={() => {
                      const previousComments = [...comments];

                      setComments(currentComments =>
                        currentComments.filter(c => c.id !== comment.id),
                      );

                      deleteComment(comment.id).catch(() =>
                        setComments(previousComments),
                      );
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
          </>
        )}

        {!loading &&
          !loadingError &&
          (!isFormVisible ? (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          ) : (
            <NewCommentForm
              selectedPostId={selectedPost.id}
              onAdd={(newComment: UserComment) => {
                setComments(currentComments => [
                  ...currentComments,
                  newComment,
                ]);
              }}
            />
          ))}
      </div>
    </div>
  );
};
