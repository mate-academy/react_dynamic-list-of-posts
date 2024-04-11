import React, { useEffect, useState } from 'react';
import { deleteComment, getComments, postComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  selectedPost: Post;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsCommenting(false);
        setIsError(false);
        setIsLoading(true);
        const commentsFromServer = await getComments(selectedPost.id);

        setComments(commentsFromServer);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(comments.filter(comment => comment.id !== commentId));
      await deleteComment(commentId);
    } catch {
      setComments(comments);
    }
  };

  const handleCommentCreate = async (comment: Omit<Comment, 'id'>) => {
    try {
      const commentDataFromServer = await postComment(comment);

      setComments([...comments, commentDataFromServer]);
    } catch {
      setComments(comments);
    }
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
          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {isLoading ? (
            <Loader />
          ) : comments.length === 0 && !isError ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment, index) => (
                <article
                  className="message is-small"
                  key={index}
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
          {!isCommenting && !isLoading && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommenting(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isCommenting && !isLoading && !isError && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            onCommentCreation={handleCommentCreate}
          />
        )}
      </div>
    </div>
  );
};
