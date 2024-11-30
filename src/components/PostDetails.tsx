import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { addComment, deleteComment, getComments } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  showForm,
  setShowForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [buttonLoader, setButtonLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);
  const [commentError, setCommentError] = useState('');

  const errorMessage = 'Something went wrong';

  useEffect(() => {
    if (selectedPost) {
      setCommentLoader(true);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setCommentError(errorMessage))
        .finally(() => setCommentLoader(false));
    }
  }, [selectedPost, setComments]);

  const addFunction = ({ name, email, body }: CommentData) => {
    setButtonLoader(true);

    const postId = selectedPost?.id || 0;

    return addComment({ postId, name, email, body })
      .then(newComment => setComments([...comments, newComment]))
      .catch(() => {
        setCommentError(errorMessage);
      })
      .finally(() => setButtonLoader(false));
  };

  const deleteFunction = (commentId: number) => {
    setComments(currentCommenst => {
      return currentCommenst.filter(comment => comment.id !== commentId);
    });

    deleteComment(commentId);
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
          {commentLoader && <Loader />}

          {commentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!commentLoader && !commentError && (
            <>
              {comments.length > 0 ? (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
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
                          onClick={() => deleteFunction(comment.id)}
                          aria-label="delete"
                        >
                          {/* delete button */}
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
                </>
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {showForm ? (
                <NewCommentForm
                  buttonLoader={buttonLoader}
                  addFunction={addFunction}
                />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setShowForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
