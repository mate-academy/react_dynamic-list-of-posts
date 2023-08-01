import { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { PostContext } from '../../context/PostContext';
import * as commentAPI from '../../api/commentAPI';
import { CommentItem } from '../CommentItem';

export const PostDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isFormShow, setIsFormShow] = useState(false);

  const {
    comments,
    setComments,
    selectedPost,
    errorMessage,
    setErrorMessage,
  } = useContext(PostContext);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setLoading(true);
    setIsFormShow(false);

    commentAPI.getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!errorMessage && !loading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </>
          )}

          {!errorMessage && !loading && !isFormShow && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShow(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShow && <NewCommentForm />}
      </div>
    </div>
  );
};
