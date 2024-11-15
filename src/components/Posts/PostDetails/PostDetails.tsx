import React, { useLayoutEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../../types/Post';
import { Loader } from '../../Loader';
import { Comments } from '../../Comments/Comments';
import { useComments } from '../../../hooks/useComments';
import { ErrorNotification } from '../../ErrorNotification/ErrorNotification';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const {
    handleAddComment,
    handleDeleteComment,
    fetchComments,
    error,
    comments,
    isLoading,
  } = useComments(post.id);
  const [isFormOpen, setFormOpen] = useState(false);

  useLayoutEffect(() => {
    fetchComments();

    return setFormOpen(false);
  }, [post.id, fetchComments]);

  const CommentsView = (
    <>
      {!comments.length ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <Comments
          comments={comments}
          handleDeleteComment={handleDeleteComment}
        />
      )}
      <button
        data-cy="WriteCommentButton"
        type="button"
        className="button is-link"
        onClick={() => setFormOpen(true)}
      >
        Write a comment
      </button>
    </>
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">{isLoading ? <Loader /> : CommentsView}</div>

        {isFormOpen && <NewCommentForm handleAddComment={handleAddComment} />}

        {error && <ErrorNotification />}
      </div>
    </div>
  );
};
