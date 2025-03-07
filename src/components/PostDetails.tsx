import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentComponent } from './CommentComponent';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post;
  postComments: Comment[] | null;
  commentsLoading: boolean;
  // commentsError: string;
  commentFormOpened: boolean;
  setCommentFormOpened: (arg: boolean) => void;
  createComment: (postId: number, newComment: CommentData) => Promise<Comment>;
  isSubmitting: boolean;
  onDeleteComment: (commentId: number) => void;
  errorMessage: string;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  postComments,
  commentsLoading,
  // commentsError,
  commentFormOpened,
  setCommentFormOpened,
  createComment,
  isSubmitting,
  onDeleteComment,
  errorMessage,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {commentsLoading ? (
          <Loader />
        ) : (
          <>
            {errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {postComments?.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {postComments?.length !== 0 && postComments && (
              <>
                <p className="title is-4">Comments:</p>

                {postComments.map(comment => (
                  <CommentComponent
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    key={comment.id}
                  />
                ))}
              </>
            )}

            {!errorMessage && !commentFormOpened && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setCommentFormOpened(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {commentFormOpened && (
        <NewCommentForm
          createComment={createComment}
          selectedPost={selectedPost}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};
