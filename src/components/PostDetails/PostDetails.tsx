import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Comment, Post } from '../../react-app-env';
import { getPostComments, getPostDetails } from '../../api/posts';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [showComments, setShowComments] = useState(true);
  const [postDetails, setPostDetails] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);

  const loadPostDetails = async () => {
    const loadedPostDetails = await getPostDetails(selectedPostId);

    setPostDetails(loadedPostDetails);
  };

  const loadComments = async () => {
    const loadedComments = await getPostComments(selectedPostId);

    setComments(loadedComments);
  };

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  const deleteCommentHandler = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const addCommentHandler = (newComment: Comment) => {
    setComments(state => [...state, newComment]);
  };

  return (
    <div className="PostDetails">
      <h2>{`Post details: ${postDetails?.id}`}</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments" data-cy="postDetails">
        {showComments
          ? (
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(false)}
            >
              Hide comments
            </button>
          )
          : (
            <button
              type="button"
              className="button"
              onClick={() => setShowComments(true)}
            >
              Show comments
            </button>
          )}

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map((comment: Comment) => (
              <li className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteCommentHandler(comment.id)}
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
            id={comments.length > 0
              ? (comments[comments.length - 1].id + 1)
              : (1)}
            selectedPostId={selectedPostId}
            onAddComment={addCommentHandler}
          />
        </div>
      </section>
    </div>
  );
};
