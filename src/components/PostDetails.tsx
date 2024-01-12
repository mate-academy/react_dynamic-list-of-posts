import React, { } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment } from '../api/comments';
import { CommentItem } from './CommentItem';

type Props = {
  comment: Comment[],
  postForComment: Post,
  isErrorComment: boolean,
  loaderComment: boolean,
  isNewComment: boolean,
  setIsNewComment: (value: boolean) => void,
  setComment: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const PostDetails: React.FC<Props> = ({
  comment,
  postForComment,
  isErrorComment,
  loaderComment,
  isNewComment,
  setIsNewComment,
  setComment,
}) => {
  const renewalComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        setComment((prevValue) => prevValue
          .filter(item => item.id !== id));
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #
            {postForComment?.id}
            :
            {' '}
            {postForComment?.title}
          </h2>

          <p data-cy="PostBody">
            {postForComment?.body}
          </p>
        </div>

        <div className="block">

          {loaderComment && (<Loader />)}
          {!loaderComment && (
            <>
              {isErrorComment && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {comment.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              <p className="title is-4">Comments:</p>
              {comment?.map(item => (
                <CommentItem
                  key={item.id}
                  commentItem={item}
                  renewalComment={renewalComment}
                />
              ))}
              {!isNewComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsNewComment(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
        {isNewComment && (
          <NewCommentForm
            postForComment={postForComment}
            isNewComment={isNewComment}
            setComment={setComment}
          />
        )}
      </div>
    </div>
  );
};
