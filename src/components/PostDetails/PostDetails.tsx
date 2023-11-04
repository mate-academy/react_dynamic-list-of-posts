import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { deletePostComment, getPostComments } from '../../api/requests';
import { Comment } from '../../types/Comment';
import { PostComment } from '../PostComment/PostComment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formVisibility, setFormVisibility] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPostComments(id)
      .then(response => {
        setComments(response);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post]);

  const handleDeleteClick = (clickedCommentId: number) => {
    setComments(prev => (
      prev.filter(comment => comment.id !== clickedCommentId)));

    deletePostComment(id);
  };

  const handleFormClick = () => {
    setFormVisibility(true);
  };

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
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

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading && !error) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!isLoading && !error && comments.length > 0) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <PostComment
                  comment={comment}
                  key={comment.id}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </>
          )}

          {(!formVisibility && !error && !isLoading) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleFormClick}
            >
              Write a comment
            </button>
          )}

        </div>

        {formVisibility
          && <NewCommentForm postId={id} handleAddComment={handleAddComment} />}
      </div>
    </div>
  );
};
