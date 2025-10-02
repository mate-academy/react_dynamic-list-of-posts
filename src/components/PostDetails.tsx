import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';
import { LoadingState } from '../types/LoadingState';

type Props = {
  post: Post | null;
  comments: Comment[];
  loading: LoadingState;
  isError: boolean;
  onAddComment: ({
    postId,
    name,
    email,
    body,
  }: Omit<Comment, 'id'>) => Promise<void>;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  loading,
  isError,
  onAddComment,
  onDeleteComment,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsPressed(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post?.id}: {post?.title}
        </h2>
        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading.comments ? (
          <Loader />
        ) : isError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : (
          <>
            {!comments.length && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!!comments.length && (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                  />
                ))}
              </>
            )}

            {!isPressed && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsPressed(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isPressed && !isError && (
        <NewCommentForm
          loading={loading.form}
          selectedPostId={post?.id}
          onAddComment={onAddComment}
        />
      )}
    </div>
  );
};
