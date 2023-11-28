import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentsService from './api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [postComments, setPostComments] = useState<Comment[] | []>([]);
  const [newPostLoading, setNewPostLoading] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      commentsService.getComments(selectedPost.id)
        .then((data) => {
          setPostComments(data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Something went wrong!', error);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost]);

  useEffect(() => {
    setShowNewCommentForm(false);
  }, [selectedPost]);

  const handleAddCommentButtonClick = () => {
    setShowNewCommentForm(true);
  };

  const handleDeleteComment = (commentId: number) => {
    setPostComments(postComments.filter(comment => comment.id !== commentId));
    commentsService.deleteComments(commentId)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error deleting comment:', error);
        setIsError(true);
      });
  };

  const addComment = (newCommentValue: CommentData) => {
    if (selectedPost) {
      setNewPostLoading(true);
      const newComment = {
        id: 0,
        postId: selectedPost.id,
        name: newCommentValue.name,
        email: newCommentValue.email,
        body: newCommentValue.body,
      };

      commentsService.createComment(newComment)
        .then(() => {
          setPostComments([...postComments, newComment]);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Something went wrong!', error);
          setIsError(true);
        })
        .finally(() => {
          setNewPostLoading(false);
        });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (postComments.length === 0) {
      return (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      );
    }

    return (
      <>
        <p className="title is-4">Comments:</p>
        {postComments.map((comment) => (
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
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost?.id}: ${selectedPost?.title}`}
        </h2>
        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>
      <div className="block">
        {renderContent()}

        {!showNewCommentForm ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleAddCommentButtonClick}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm
            addComment={addComment}
            newPostLoading={newPostLoading}
          />
        )}
      </div>
    </div>
  );
};
