import React, { useEffect, useState } from 'react';
import * as postService from '../services/comments';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPostId: number | null;
  posts: Post[];
};

export const PostDetails: React.FC<Props> = ({ selectedPostId, posts }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (selectedPostId === null) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(false);
    setShowForm(false);

    postService
      .getComments(selectedPostId)
      .then(setComments)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, [selectedPostId]);

  const findPost = posts.find(post => post.id === selectedPostId);

  const deleteComment = async (commentId: number) => {
    try {
      await postService.deleteComment(commentId);
      setComments(currentComments =>
        currentComments.filter(c => c.id !== commentId),
      );
      setCommentError('');
    } catch {
      setCommentError('Cant delete a comment');
    }
  };

  const addComment = async ({
    postId,
    body,
    name,
    email,
  }: Omit<Comment, 'id'>) => {
    try {
      const newComment = await postService.createComment({
        postId,
        body,
        name,
        email,
      });

      setComments(currentComments => [...currentComments, newComment]);
      setCommentError('');
    } catch {
      setCommentError('Cant create a comment');
    }
  };

  const writeComment = () => setShowForm(true);

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPostId !== null && (
        <div className="content">
          <div className="block">
            <h2 data-cy="PostTitle">
              {selectedPostId}: {findPost?.title}
            </h2>
            <p data-cy="PostBody">{findPost?.body}</p>
          </div>

          <div className="block">
            {isLoading && <Loader />}

            {!isLoading && !errorMessage && comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {commentError && (
              <div className="notification is-danger" data-cy="CommentsError">
                {commentError}
              </div>
            )}

            {!isLoading && comments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
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
                        onClick={() => deleteComment(comment.id)}
                        className="delete is-small"
                        aria-label="delete"
                      />
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {!showForm && !isLoading && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={writeComment}
              >
                Write a comment
              </button>
            )}
          </div>

          {showForm && (
            <NewCommentForm
              selectedPostId={selectedPostId}
              onSubmit={addComment}
            />
          )}
        </div>
      )}
    </div>
  );
};
