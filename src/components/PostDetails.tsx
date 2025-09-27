import React, { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface PostDetailsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  showCommentForm: boolean;
}

const initialState: PostDetailsState = {
  comments: [],
  isLoading: false,
  error: null,
  showCommentForm: false,
};

interface PostDetailsProps {
  post: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [state, setState] = useState<PostDetailsState>(initialState);

  const resetState = () => {
    setState(initialState);
  };

  const updateState = (updates: Partial<PostDetailsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updateComments = (updater: (comments: Comment[]) => Comment[]) => {
    setState(prev => ({ ...prev, comments: updater(prev.comments) }));
  };

  useEffect(() => {
    if (!post) {
      resetState();

      return;
    }

    const loadComments = async () => {
      updateState({
        isLoading: true,
        error: null,
        showCommentForm: false,
      });

      try {
        const commentsData = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        updateState({
          comments: commentsData,
          isLoading: false,
        });
      } catch {
        updateState({
          error: 'Something went wrong',
          isLoading: false,
        });
      }
    };

    loadComments();
  }, [post]);

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ): Promise<Comment> => {
    if (!post) {
      throw new Error('No post selected');
    }

    const newComment = await client.post<Comment>('/comments', {
      postId: post.id,
      name,
      email,
      body,
    });

    updateComments(prev => [...prev, newComment]);

    return newComment;
  };

  const handleDeleteComment = async (commentId: number) => {
    const commentToDelete = state.comments.find(
      comment => comment.id === commentId,
    );

    // Optimistic update
    updateComments(prev => prev.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      // Restore comment on error using functional update
      if (commentToDelete) {
        updateComments(prev => [...prev, commentToDelete]);
        updateState({
          error: 'Failed to delete comment',
        });
      }
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {state.isLoading && <Loader />}

        {state.error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {state.error}
          </div>
        )}

        {!state.isLoading && !state.error && state.comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!state.isLoading && !state.error && state.comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {state.comments.map(comment => (
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
                    onClick={() => handleDeleteComment(comment.id)}
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

        {!state.isLoading && !state.error && !state.showCommentForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => updateState({ showCommentForm: true })}
          >
            Write a comment
          </button>
        )}

        {state.showCommentForm && (
          <NewCommentForm
            onSubmit={handleAddComment}
            onCancel={() => updateState({ showCommentForm: false })}
          />
        )}
      </div>
    </div>
  );
};
