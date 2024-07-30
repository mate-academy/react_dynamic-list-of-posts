/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import CommenstList from '../Comments/CommenstList';
import { NewCommentForm } from '../Comments/NewCommentForm';

type Props = {
  chosenPost: Post | null;
  error: string;
  isLoaded: boolean;
  isLoadingForm: boolean;
  comments: Comment[];
  onClickDeleteComment: (commentId: number) => void;
  onSubmitNewComment: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
};

export const PostDetails: React.FC<Props> = ({
  chosenPost: post,
  isLoaded,
  isLoadingForm,
  error,
  comments,
  onClickDeleteComment,
  onSubmitNewComment,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsFormOpen(false);
  }, [post]);

  return (
    post && (
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoaded && <Loader />}

          {!!error.length && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!error.length && !comments.length && !isLoaded && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !isLoaded && (
            <CommenstList
              onClickDeleteComment={onClickDeleteComment}
              comments={comments}
            />
          )}

          {!isLoaded && !error.length && !isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpen(true)}
            >
              Write a comment
            </button>
          )}

          {!isLoaded && !error.length && isFormOpen && (
            <NewCommentForm
              isLoading={isLoadingForm}
              onSubmitNewComment={onSubmitNewComment}
              post={post}
            />
          )}
        </div>
      </div>
    )
  );
};
