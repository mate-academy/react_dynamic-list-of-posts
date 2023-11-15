import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentsList } from './CommentsList';
import { LoadingItems } from '../types/LoadingItems';
import { HasErrorItem } from '../types/ErrorMessage';

type Props = {
  selectedPost: Post | null,
  comments: Comment[] | null,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  isLoading: LoadingItems,
  setIsLoading: React.Dispatch<React.SetStateAction<LoadingItems>>,
  hasError: HasErrorItem,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  isLoading,
  setIsLoading,
  hasError,
}) => {
  const [tempComment, setTempComment] = useState<Comment | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  let elementToRender = <Loader />;

  switch (true) {
    case isLoading === 'Comments':
      elementToRender = <Loader />;
      break;
    case hasError === 'Comments':
      elementToRender = (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
      break;
    case !comments?.length:
      elementToRender = (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
      break;
    case !!comments?.length:
      elementToRender = (
        <CommentsList
          comments={comments}
          setComments={setComments}
          tempComment={tempComment}
        />
      );
      break;
    default:
      break;
  }

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

          {elementToRender}
        </div>

        <div className="block">
          {!showCommentForm
            ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setShowCommentForm(true)}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm
                setComments={setComments}
                setTempComment={setTempComment}
                selectedPost={selectedPost}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            )}
        </div>
      </div>
    </div>
  );
};
