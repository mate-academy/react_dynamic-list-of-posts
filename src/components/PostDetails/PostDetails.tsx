import React, { useCallback, useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { GlobalContext } from '../../State';
import { deleteComment, getCommentsByPostId } from '../api/getData';

export const PostDetails: React.FC = () => {
  const {
    isLoadingComments,
    comments,
    setComments,
    selectedPost,
    setIsLoadingComments,
    setIsErrorForm,
    isErrorForm,
    isShowForm,
    setIsShowForm,
  } = useContext(GlobalContext);

  const shouldShowNoComments =
    comments.length === 0 && !isLoadingComments && !isErrorForm;
  const shouldShowComments =
    comments.length > 0 && !isLoadingComments && !isErrorForm && selectedPost;

  const handleShowForm = () => {
    setIsShowForm(true);
  };

  const hadleDeleteComment = useCallback(
    async (commentId: number) => {
      try {
        setIsErrorForm(false);

        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        );

        deleteComment(commentId);
      } catch (error) {
        setIsErrorForm(true);
      }
    },
    [setComments, setIsErrorForm],
  );

  const fetchComments = useCallback(async () => {
    if (!selectedPost) {
      return;
    }

    try {
      setIsLoadingComments(true);
      setIsErrorForm(false);
      const commentsData = await getCommentsByPostId(selectedPost.id);

      setComments(commentsData);
    } catch (error) {
      setIsErrorForm(true);
    } finally {
      setIsLoadingComments(false);
    }
  }, [selectedPost, setComments, setIsErrorForm, setIsLoadingComments]);

  useEffect(() => {
    fetchComments();
  }, [selectedPost, fetchComments]);

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
          {isLoadingComments && <Loader />}

          {isErrorForm && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {shouldShowNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {shouldShowComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => hadleDeleteComment(comment.id)}
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

          {!isShowForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShowForm && <NewCommentForm />}
      </div>
    </div>
  );
};
