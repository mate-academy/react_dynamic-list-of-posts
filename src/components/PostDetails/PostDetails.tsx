import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Comment, CommentData } from '../../types/Comment';
import {
  addComment,
  getCommentsByPostId,
  removeComment,
} from '../../api/loadData';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReadyToAddComment, setIsReadyToAddComment] = useState(false);

  const hasNoComments = comments.length === 0;

  const loadComments = async () => {
    setIsLoading(true);

    try {
      const loadedComments = await getCommentsByPostId(post.id);

      setComments(loadedComments);
      setIsLoading(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    setComments([]);
    loadComments();
    setIsReadyToAddComment(false);
  }, [post.id]);

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  const handleRemoveComment = async (commentId: number) => {
    setComments(currentComments => (
      currentComments.filter(comment => comment.id !== commentId)
    ));

    try {
      await removeComment(commentId);
    } catch {
      setIsError(true);
    }
  };

  const handleAddcomment = async (comment: CommentData) => {
    const newComment = {
      postId: 0,
      ...comment,
    };

    try {
      const addedComment = await addComment(newComment);

      setComments(currentComments => [...currentComments, addedComment]);
    } catch (error) {
      setIsError(true);
    }
  };

  const isAddButtonVisible = (!isLoading && !isReadyToAddComment);
  const isCommentsVisible = (!hasNoComments && !isLoading);
  const isNoComments = (hasNoComments && !isLoading);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id} ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isCommentsVisible && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleRemoveComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {isAddButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsReadyToAddComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isReadyToAddComment && (
          <NewCommentForm onAddComment={handleAddcomment} />
        )}
      </div>
    </div>
  );
};
