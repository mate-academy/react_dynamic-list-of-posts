import React, { useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { useComments } from './hooks/useComments';
import { CommentItem } from './Comment';

interface PostDetailsProps {
  post: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const {
    comments,
    isLoadingComments,
    commentsError,
    setIsCommentFormActive,
    isCommentFormActive,
    handleDeleteComment,
    authorName,
    setAuthorName,
    email,
    setEmail,
    commentText,
    setCommentText,
    handleAddComment,
    isAddCommentLoading,
  } = useComments();

  useEffect(() => {
    setIsCommentFormActive(false);
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader></Loader>}

          {commentsError && (
            <p className="title is-4" data-cy="CommentsError">
              {commentsError}
            </p>
          )}

          {!isLoadingComments && !commentsError && comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : !isLoadingComments ? (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                return (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                  />
                );
              })}
            </>
          ) : null}

          {!isCommentFormActive && !isLoadingComments && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormActive && (
          <NewCommentForm
            authorName={authorName}
            setAuthorName={setAuthorName}
            email={email}
            setEmail={setEmail}
            commentText={commentText}
            setCommentText={setCommentText}
            handleAddComment={handleAddComment}
            isAddCommentLoading={isAddCommentLoading}
          />
        )}
      </div>
    </div>
  );
};
