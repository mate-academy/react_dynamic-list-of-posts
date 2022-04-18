import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isVisibleComments, setIsVisibleComments] = useState(true);

  const getDetails = () => {
    getPostDetails(selectedPostId)
      .then(detailsFromServer => setPostDetails(detailsFromServer));
  };

  const getComments = () => {
    getPostComments(selectedPostId);
  };

  useEffect(() => {
    Promise.all([getDetails(), getComments()]);
  }, [selectedPostId]);

  const showComment = () => {
    setIsVisibleComments(!isVisibleComments);
  };

  const addNewComment = (newComment: Comment) => {
    setPostComments([
      ...postComments,
      newComment,
    ]);
  };

  const removeComment = (commentId: string) => {
    deleteComment(commentId)
      .then(deletedComment => {
        if (deletedComment) {
          setPostComments(
            postComments.filter(comments => comments.id !== commentId),
          );
        }
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length
          ? (
            <button
              type="button"
              className="button"
              hidden={PostDetails.length < 1}
              onClick={showComment}
            >
              {
                `${isVisibleComments ? 'Hide' : 'Show'}
                ${postComments.length}
                ${postComments.length < 2 ? 'comment' : 'comments'}`
              }
            </button>
          ) : (
            <p
              className="PostDetails__list-item"
            >
              No comments yet. You can leave a comment first &#9660;
            </p>
          )}

        {isVisibleComments
          && (
            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            onAdd={addNewComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
});
