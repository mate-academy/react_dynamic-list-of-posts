import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useUserContext } from './Context/Context';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    postSelected,
    setComments,
    errorComments,
    setErrorComments,
    isLoadingComments,
    setIsLoadingComments,
    comments,
    commentToDelete,
    setCommentToDelete,
    showForm,
    setShowForm,
  } = useUserContext();

  const handlerFormOpener = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (postSelected) {
      setIsLoadingComments(true);
      setShowForm(false);
      client.get(`/comments?postId=${postSelected?.id}`)
        .then((response: unknown) => {
          setComments(response as Comment[]);
        })
        .catch(() => {
          setErrorComments('Error loading comments');
        })
        .finally(() => {
          setIsLoadingComments(false);
        });
    }
  }, [postSelected]);

  const handleDeleteComment = (comment: Comment) => {
    setCommentToDelete(comment);

    if (comments) {
      const newComments = comments
        .filter(currComment => currComment.id !== comment.id);

      setComments(newComments);
    }
  };

  useEffect(() => {
    client.delete(`/comments/${commentToDelete?.id}`)
      .finally(() => {
        setCommentToDelete(null);
      });
  }, [commentToDelete]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postSelected?.id}: ${postSelected?.title}`}
          </h2>

          <p data-cy="PostBody">
            {postSelected?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && (
            <Loader />
          )}

          {errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorComments}
            </div>
          )}

          {!comments?.length && !isLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {comments?.length && !isLoadingComments && (
            <p className="title is-4">Comments:</p>
          )}

          {comments?.length && !isLoadingComments
            && (comments?.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            )))}

          {(!isLoadingComments && !showForm) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handlerFormOpener}
            >
              Write a comment
            </button>
          )}
        </div>

        {(!isLoadingComments && showForm) && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
