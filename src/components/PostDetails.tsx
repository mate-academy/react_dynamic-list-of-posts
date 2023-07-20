import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, postComment } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  isLoading: boolean,
  isError: boolean,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost, comments, setComments, isLoading, isError,
}) => {
  const [isActive, setIsActive] = useState(false);

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const addComment = async (
    name: string, email: string, body: string, postId: number,
  ) => {
    const newComment = {
      postId,
      name,
      email,
      body,
    };

    try {
      const postedCommentToServer = await postComment(newComment);

      setComments(prevComments => [...prevComments, postedCommentToServer]);
    } catch (error) {
      throw new Error('Unable to create new comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost.body}
            </p>
          </div>

          <div className="block">
            {isLoading && <Loader />}

            {isError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!isLoading && !isError && comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!!comments.length && (
              <p className="title is-4">Comments:</p>
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
                    onClick={() => removeComment(comment.id)}
                  >
                    Delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

            {(!isActive && !isError && !isLoading) && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsActive(true)}
              >
                Write a comment
              </button>
            )}
          </div>

          {isActive && (
            <NewCommentForm
              postId={selectedPost.id}
              addComment={addComment}
            />
          )}
        </div>
      )}
    </div>
  );
};
