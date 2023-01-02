import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  targetPost: Post;
};

export const PostDetails: React.FC<Props> = ({
  targetPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  async function getComments(postId: number) {
    setIsLoading(true);
    const url = `/comments?postId=${postId}`;

    try {
      const allComments: Comment[] = await client.get(url);

      setComments(allComments);
    } catch (error) {
      setShowError(true);
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addComment(commentData: Comment) {
    setIsAdding(true);

    try {
      await client.post('/comments', commentData);
      setComments(prev => [...prev, commentData]);
      getComments(targetPost.id);
    } catch (error) {
      setShowError(true);
    } finally {
      setIsAdding(false);
      setShowError(false);
    }
  }

  async function deleteComment(commentId: number) {
    const url = `/comments/${commentId}`;

    await client.delete(url);

    try {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      setShowError(true);
    }

    setShowError(false);
  }

  useEffect(() => {
    getComments(targetPost.id);
    setIsOpenForm(false);
  }, [targetPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${targetPost.id}: ${targetPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {targetPost.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {showError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

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

          {(!isLoading && !isOpenForm) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenForm && (
          <NewCommentForm
            isAdding={isAdding}
            addComment={(val) => addComment(val)}
            postId={targetPost.id}
          />
        )}
      </div>
    </div>
  );
};
