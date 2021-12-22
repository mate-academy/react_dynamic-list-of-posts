import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, addComment, deleteComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({} as Post);
  const [comments, setComments] = useState([] as Comment[]);
  const [showComments, setShowComments] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadPostDetails = async () => {
    setLoading(true);
    const [detailsFromServer, commentsFromServer] = await Promise.all([
      getPostDetails(postId),
      getPostComments(postId)]);

    setPostDetails(detailsFromServer);
    setComments(commentsFromServer);
    setLoading(false);
  };

  useEffect(() => {
    loadPostDetails();
  }, [postId]);

  const handleAddComment = async ({ name, body, email }: CommentBody) => {
    await addComment({
      postId,
      name,
      body,
      email,
    });
    const commentsFromServer = await (getPostComments(postId));

    setComments(commentsFromServer);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
    const commentsFromServer = await (getPostComments(postId));

    setComments(commentsFromServer);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loading ? 'Loading post details...' : (
        <>
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {showComments ? 'Hide' : 'Show'}
              {' '}
              {comments.length}
              {' '}
              comments
            </button>

            <ul className="PostDetails__list">
              {showComments && comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                handleAddComment={handleAddComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
