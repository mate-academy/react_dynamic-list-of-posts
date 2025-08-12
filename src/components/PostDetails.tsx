import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../client/clientMethods';

type Props = {
  selectedPost: Post;
  isFormOpened: boolean;
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isFormOpened,
  setIsFormOpened,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddDeleteError, setIsAddDeleteError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getPostComments(selectedPost.id)
      .then(result => setComments(result))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost.id]);

  const allComments = useRef(comments);

  function handleDeletion(comment: Comment) {
    allComments.current = comments;

    setComments(comments?.filter(x => x.id !== comment.id) || null);
    deleteComment(comment.id).catch(() => {
      setComments(allComments.current);
      setIsError(true);
      setIsAddDeleteError(true);
    });
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isAddDeleteError && (
            <button
              type="button"
              className="button is-link"
              onClick={() => {
                setIsAddDeleteError(false);
                setIsError(false);
                setComments(allComments.current);
              }}
            >
              Retry
            </button>
          )}

          {(!comments || comments?.length === 0) && !isError && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments?.length !== 0 && comments && selectedPost && !isError && (
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
                      onClick={() => handleDeletion(comment)}
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

          {!isFormOpened && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpened && !isError && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
            comments={comments}
            setIsError={setIsError}
            setIsAddDeleteError={setIsAddDeleteError}
          />
        )}
      </div>
    </div>
  );
};
