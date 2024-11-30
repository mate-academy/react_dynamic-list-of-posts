import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { NewCommentForm } from './NewCommentForm';
import { getComments, addComment, deleteComment } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  currPost: Post | null;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  currPost,
  openModal,
  setOpenModal,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);

  const onAdd = ({ name, email, body }: CommentData) => {
    setBtnLoader(true);

    const postId = currPost?.id || 0;

    return addComment({ postId, name, email, body })
      .then(newComment => setComments([...comments, newComment]))
      .catch(() => {
        setError(true);
      })
      .finally(() => setBtnLoader(false));
  };

  const onDelete = (commentId: number) => {
    setComments(currCommenst => {
      return currCommenst.filter(comment => comment.id !== commentId);
    });

    deleteComment(commentId)
      .then(() => {})
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (currPost) {
      setCommentLoader(true);
      getComments(currPost.id)
        .then(setComments)
        .catch(() => setError(true))
        .finally(() => setCommentLoader(false));
    }
  }, [currPost, setComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${currPost?.id}: ${currPost?.title}`}</h2>

          <p data-cy="PostBody">{currPost?.body}</p>
        </div>

        <div className="block">
          {commentLoader && <Loader />}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!commentLoader && !error && (
            <>
              {comments.length > 0 ? (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
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
                          onClick={() => onDelete(comment.id)}
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
              ) : (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
              {openModal ? (
                <NewCommentForm onAdd={onAdd} loader={btnLoader} />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setOpenModal(true)}
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
