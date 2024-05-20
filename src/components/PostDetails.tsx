import React, { Dispatch, useEffect, useState } from 'react';

import { deleteComment } from '../api/deleteComment';
import { getComments } from '../api/getComments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  selectedPost: Post;
  setIsAddingNewPost: Dispatch<React.SetStateAction<boolean>>;
  isAddingNewPost: boolean;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  setIsAddingNewPost,
  isAddingNewPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await getComments(selectedPost.id);

        setComments(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPost.id]);

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== id),
      );
    } catch (error) {
      window.console.error('Failed to delete comment:', error);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>
      <div className="block">
        {!isError && isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
        {comments.length === 0 && !isLoading && !isError && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length !== 0 && !isError && !isLoading && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
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
        {!isAddingNewPost && !isError && !isLoading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsAddingNewPost(true)}
          >
            Write a comment
          </button>
        )}
      </div>
      {!isError && isAddingNewPost && (
        <NewCommentForm
          selectedPost={selectedPost}
          setComments={setComments}
          setIsError={setIsError}
        />
      )}
    </div>
  );
};
