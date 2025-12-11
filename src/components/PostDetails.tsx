import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as apiComments from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

const PostDetailsComponent: React.FC<Props> = ({ post }) => {
  const [loadingCommets, setLoadingComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await apiComments.addComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setPostComments(prev => {
        return [...prev, newComment];
      });
    } catch {
      setErrorMessage('Failed to add comment to server');
      throw new Error();
    }
  };

  const deleteComment = async (commentId: number) => {
    const prevComments = postComments;

    try {
      setPostComments(prev => prev.filter(comment => comment.id !== commentId));
      await apiComments.deletePostComment(commentId);
    } catch {
      setErrorMessage('Failed to delete comment from server');
      setPostComments(prevComments);
    }
  };

  useEffect(() => {
    const getPostCommentsFromServer = async () => {
      try {
        setErrorMessage('');
        setLoadingComments(true);
        const commentsFromServer = await apiComments.getPostComment(post.id);

        setPostComments(commentsFromServer);
      } catch {
        setErrorMessage('Failed to get comments from server');
      } finally {
        setLoadingComments(false);
      }
    };

    getPostCommentsFromServer();

    return () => setIsFormVisible(false);
  }, [post]);

  const isPlugVisible =
    postComments.length === 0 && !loadingCommets && !errorMessage;
  const isCommentsVisible = postComments.length > 0 && !loadingCommets;
  const isNewCommentButtonVisible =
    !isFormVisible && !loadingCommets && !errorMessage;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {loadingCommets && <Loader />}

        {errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errorMessage}
          </div>
        )}

        {isPlugVisible && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isCommentsVisible && (
          <>
            <p className="title is-4">Comments:</p>

            {postComments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
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
        {isNewCommentButtonVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>
      {isFormVisible && <NewCommentForm key={post.id} onSubmit={addComment} />}
    </div>
  );
};

export const PostDetails = React.memo(PostDetailsComponent);
