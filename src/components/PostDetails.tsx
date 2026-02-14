import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

interface State {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  isAddingComment: boolean;
  actionError: string | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [state, setState] = useState<State>({
    comments: [],
    isLoading: false,
    hasError: false,
    isAddingComment: false,
    actionError: null,
  });

  const { comments, isLoading, hasError, isAddingComment, actionError } = state;

  const addComment = async (
    commentData: Pick<Comment, 'name' | 'email' | 'body'>,
  ) => {
    try {
      const newComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      setState(prev => ({
        ...prev,
        comments: [...prev.comments, newComment],
        actionError: null,
      }));
    } catch {
      setState(prev => ({
        ...prev,
        actionError: 'Failed to add comment. Please try again.',
      }));
      throw new Error('Failed to add comment');
    }
  };

  useEffect(() => {
    setState({
      comments: [],
      isLoading: true,
      hasError: false,
      isAddingComment: false,
      actionError: null,
    });

    const fetchComments = async () => {
      try {
        const dataComments: Comment[] = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setState(prev => ({
          ...prev,
          comments: dataComments,
          isLoading: false,
        }));
      } catch {
        setState(prev => ({
          ...prev,
          isLoading: false,
          hasError: true,
        }));
      }
    };

    fetchComments();
  }, [post.id]);

  const deleteComment = async (commentId: number) => {
    const previousComments = [...comments];

    setState(prev => ({
      ...prev,
      actionError: null,
      comments: prev.comments.filter(comment => comment.id !== commentId),
    }));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setState(prev => ({
        ...prev,
        actionError: 'Failed to delete comment. Please try again.',
        comments: previousComments,
      }));
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !hasError && comments.length > 0 && (
          <p className="title is-4">Comments:</p>
        )}

        {actionError && (
          <div className="notification is-danger">
            <button
              type="button"
              className="delete"
              onClick={() => setState(prev => ({ ...prev, actionError: null }))}
              aria-label="Close"
            />
            {actionError}
          </div>
        )}

        {comments.map(comment => (
          <article
            className="message is-small"
            data-cy="Comment"
            key={comment.id}
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

        {!isLoading && !hasError && !isAddingComment && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() =>
              setState(prev => ({
                ...prev,
                isAddingComment: true,
              }))
            }
          >
            Write a comment
          </button>
        )}
      </div>

      {isAddingComment && <NewCommentForm onSubmitForm={addComment} />}
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
