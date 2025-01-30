import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments } from '../api/api';
import { deleteComments } from '../api/api';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsError, setCommentsError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      getComments(selectedPost.id)
        .then((data) => {
          setComments(data);
          setIsLoading(false);
        })
        .catch(() => {
          setCommentsError('Unable to load comments');
          setIsLoading(false);
        });
    } else {
      setComments([]);
      setCommentsError('');
      setIsLoading(false);
    }
  }, [selectedPost]);

  const openForm = () => {
    setIsFormOpen(prevState => !prevState);
  }

  if (!selectedPost) return null;

  const deleteComment = (commentId: number) => {

    deleteComments(commentId)
      .then(() => {
        setComments(comments.filter(comment => comment.id != commentId));
      })
  }

  return (
    <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{selectedPost.title}</h2>
          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : commentsError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          ) : comments.length === 0 ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
          ) : (
            <>
          <p className="title is-4">Comments:</p>
          {comments.map((comment) => (
          <article className="message is-small" data-cy="Comment" key={comment.id}>
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

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={openForm}
          >
            Write a comment
          </button>
        </div>

        {isFormOpen && <NewCommentForm selectedPost={selectedPost} setComments={setComments}/>}
      </div>
  );
}
