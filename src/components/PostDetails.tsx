import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { CommentsList } from './CommentsList';
import { ErrorsType, InputDataType } from '../types/InputCommentData';

type PostDetailsType = {
  selectedPost: Post | null;
  loading: boolean;
  comments: Comment[];
  errorMessage: string;
  addComment: (data: CommentData) => void;
  inputCommentData: CommentData;
  setInputCommentData: React.Dispatch<React.SetStateAction<InputDataType>>;
  inputCommentErrors: ErrorsType;
  setInputCommentErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
  deleteComment: (commentId: number) => void;
  loadingComments: boolean;
  formOpened: boolean;
  setFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
};

export const PostDetails: React.FC<PostDetailsType> = ({
  selectedPost,
  comments,
  errorMessage,
  addComment,
  inputCommentData,
  setInputCommentData,
  inputCommentErrors,
  setInputCommentErrors,
  deleteComment,
  loadingComments,
  formOpened,
  setFormOpened,
  isSubmitting,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComments ? (
            <Loader />
          ) : (
            <>
              {errorMessage === 'Unable to load comments' && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}
              {comments?.length === 0 && !loadingComments ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>
                  <CommentsList
                    comments={comments}
                    deleteComment={deleteComment}
                  />
                </>
              )}

              {!formOpened && !loadingComments && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setFormOpened(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
        {formOpened && (
          <NewCommentForm
            addComment={addComment}
            inputCommentData={inputCommentData}
            setInputCommentData={setInputCommentData}
            selectedPost={selectedPost}
            inputCommentErrors={inputCommentErrors}
            setInputCommentErrors={setInputCommentErrors}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};
