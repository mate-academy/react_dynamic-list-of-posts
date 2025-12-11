import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCreatePressed, setIsCreatePressed] = useState(false);

  const deleteComment = (commentId: number) => {
    setComments(currComments =>
      currComments.filter(comment => comment.id !== commentId),
    );

    client.delete(`/comments/${commentId}`).catch(error => {
      setComments(comments);
      throw error;
    });
  };

  const addNewComment = (newComment: Omit<Comment, 'id'>) => {
    setIsAdding(true);

    client
      .post<Comment>('/comments', newComment)
      .then(returnedComment => {
        setComments(currComments => [...currComments, returnedComment]);
      })
      .catch(error => {
        setErrorMessage('Failed to add comment. Please try again.');
        setComments(comments);
        throw error;
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    if (post) {
      client
        .get<Comment[]>(`/comments?postId=${post.id}`)
        .then(setComments)
        .catch(error => {
          setErrorMessage('Something went wrong');
          throw error;
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !errorMessage && comments && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !errorMessage && comments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

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
            </>
          )}
          {!isLoading && !errorMessage && !isCreatePressed && comments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCreatePressed(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isCreatePressed && (
          <NewCommentForm
            postId={post.id}
            onAdd={addNewComment}
            isAdding={isAdding}
          />
        )}
      </div>
    </div>
  );
};
