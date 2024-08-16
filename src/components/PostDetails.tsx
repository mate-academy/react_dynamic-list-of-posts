import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);

  useEffect(() => {
    setComments([]);
    setIsNewCommentForm(false);
    setIsError(false);
    setIsLoading(true);
    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedPost]);

  const handleAddComment = (addedComment: Comment) =>
    setComments(prevComments => [...prevComments, addedComment]);

  const handleDeleteComment = (onDeleteCommentId: number) => {
    setComments(prevComments =>
      prevComments.filter(prevComment => prevComment.id !== onDeleteCommentId),
    );
    client
      .delete(`/comments/${onDeleteCommentId}`)
      .catch(() => setComments(comments));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !!comments.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!!comments.length &&
            comments.map(comment => {
              const { id, name, email, body } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
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
                </article>
              );
            })}

          {!isError && !isLoading && !isNewCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewCommentForm && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
