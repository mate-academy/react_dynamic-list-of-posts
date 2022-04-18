import React, { useEffect, useState } from 'react';
import { addComment, getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/posts';
import { Comment } from '../../types/comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPost: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showedComments, setShowedComments] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPost)
      .then(detailsFromSserver => {
        setPostDetails(detailsFromSserver);
      });
  }, []);

  useEffect(() => {
    getPostComments(selectedPost)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, []);

  const deleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    removeComment(commentId);
  };

  const addNewComment = (newComment: Comment) => {
    setComments(CurrentComment => [...CurrentComment, newComment]);
    addComment(newComment);
  };

  const hideCommment = () => {
    setShowedComments(comment => {
      if (comment) {
        return false;
      }

      return true;
    });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>
      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={hideCommment}
          >
            {showedComments ? (
              `Hide ${comments.length} comments`
            ) : (
              `Show ${comments.length} comments`
            )}
          </button>
          { showedComments && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addNewComment}
            selectedPost={selectedPost}
          />
        </div>
      </section>
    </div>
  );
};
