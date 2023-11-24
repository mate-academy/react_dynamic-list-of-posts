import React, {
  useContext,
} from 'react';
import { Loader } from './Loader';
import { PostContext } from './Context/PostContext';
import { CommentContext } from './Context/CommentContext';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useContext(PostContext);

  const {
    comments,
    isLoadingComments,
    hasCommentsError,
    isOpenNewCommentForm,
    setIsOpenNewCommentForm,
  } = useContext(CommentContext);

  const noCommentsMsg
    = !isLoadingComments && !hasCommentsError && !comments.length;

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
          {isLoadingComments && <Loader />}

          {hasCommentsError
            && (
              <div
                className="notification is-danger"
                data-cy="CommentsError"
              >
                Something went wrong
              </div>
            )}

          {noCommentsMsg
            && (
              <p
                className="title is-4"
                data-cy="NoCommentsMessage"
              >
                No comments yet
              </p>
            )}

          {!!comments.length && <CommentsList />}

          {isOpenNewCommentForm && selectedPost
            ? <NewCommentForm selectedPost={selectedPost} />
            : (
              <div className="block">
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsOpenNewCommentForm(true)}
                >
                  Write a comment
                </button>
              </div>
            )}

        </div>
      </div>
    </div>
  );
};
