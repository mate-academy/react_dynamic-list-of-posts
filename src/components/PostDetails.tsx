import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null;
};


export const PostDetails: React.FC<Props> = React.memo(({ selectedPost }) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);


  const { id = 0, title = '', body = '' } = selectedPost || {};

  useEffect(() => {
    setIsFormVisible(false);
  }, [selectedPost]);


  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setError(null);

      client
        .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
        .then(data => {
          setComments(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError('Failed to load comments');
          setIsLoading(false);
          console.error('Failed to load comments:', err);
        });
    } else {
      setComments([]);
    }
  }, [selectedPost]);


  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      await client.delete(`/comments/${commentId}`);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
      console.error('Failed to delete comment:', err);
    }
  }, []);


  const handleShowForm = useCallback(() => {
    setIsFormVisible(true);
  }, []);


  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };


  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>}

          {!isLoading && !comments.length && !error && <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

          {comments.map(({ id, email, name, body }) =>
            <article className="message is-small" data-cy="Comment" key={id}>
              <div className="message-header">
                <a href={`mailto:${email}`} data-cy="CommentAuthor">
                  {name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {body}
              </div>
            </article>)}
          {!isLoading && !isFormVisible && !error &&
            (<button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowForm}
            >
              Write a comment
            </button>)}
        </div>

        {isFormVisible && <NewCommentForm postId={id} addComment={addComment} />}
      </div>
    </div>
  );
});
