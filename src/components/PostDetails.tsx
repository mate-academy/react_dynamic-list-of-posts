import { useContext } from 'react';
import { PostsContext } from '../services/Store';
import { Comments } from './Comments';
import { LoaderType } from '../types/LoaderType';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ErrorType } from '../types/ErrorType';

type Props = {
  showWritteCommentButton: boolean;
  setShowWritteCommentButton: () => void;
  showNoCommentsMessage: boolean;
};

export const PostDetails: React.FC<Props> = ({
  showWritteCommentButton,
  setShowWritteCommentButton,
  showNoCommentsMessage,
}) => {
  const {
    selectedPostId,
    posts,
    loading,
    errorTypeMessage,
    comments,
    showNewCommentForm,
  } = useContext(PostsContext);

  let selectedPost;

  if (selectedPostId) {
    selectedPost = posts.find(post => post.id === selectedPostId);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost?.id}: {selectedPost?.title}
        </h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {loading === LoaderType.CommentsLoader && <Loader />}

        {loading !== LoaderType.CommentsLoader && !!comments.length && (
          <Comments />
        )}

        {loading !== LoaderType.CommentsLoader &&
          !comments.length &&
          showNoCommentsMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
      </div>

      {errorTypeMessage === ErrorType.CommentsError && (
        <div className="notification is-danger" data-cy="CommentsError">
          {'Something went wrong!'}
        </div>
      )}

      {showWritteCommentButton && (
        <button
          onClick={() => setShowWritteCommentButton()}
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
        >
          Write a comment
        </button>
      )}

      {!showWritteCommentButton && showNewCommentForm && <NewCommentForm />}
    </div>
  );
};
