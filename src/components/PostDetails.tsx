import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { getCommentsByPostId } from '../api/posts';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';
import { DispatchContext, StateContext } from '../PostsContext';
import { ReducerType } from '../types/ReducerType';

enum CommentsStatus {
  Loading = 'Loading',
  Error = 'Error',
  ShowComments = 'ShowComments',
}

interface Props {
  post: Post
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { comments } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isWritingComment, setIsWritingComment] = useState(false);

  const [commentsStatus, setCommentsStatus]
    = useState<CommentsStatus>(CommentsStatus.ShowComments);

  useEffect(() => {
    setCommentsStatus(CommentsStatus.Loading);
    getCommentsByPostId(post.id)
      .then((items) => {
        dispatch({
          type: ReducerType.SetComments,
          payload: items,
        });
        setCommentsStatus(CommentsStatus.ShowComments);
      })
      .catch(() => setCommentsStatus(CommentsStatus.Error));
  }, [dispatch, post]);

  const renderComments = () => {
    switch (commentsStatus) {
      case CommentsStatus.Loading:
        return <Loader />;

      case CommentsStatus.ShowComments:
        return comments?.length
          ? (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                />
              ))}
            </>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          );

      default:
        return (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        );
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {renderComments()}

          {!isWritingComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(!isWritingComment)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritingComment && <NewCommentForm postId={post.id} />}
      </div>
    </div>
  );
};
