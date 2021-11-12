import React, { useState, useEffect } from 'react';
import { addNewComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(details => setPostDetails(details));

    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPostId]);

  const onChange = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  const onCommentAdd = (comment: Partial<Comment>) => {
    addNewComment(comment)
      .then(() => {
        getPostComments(selectedPostId)
          .then(newComments => setComments(newComments));
      });
  };

  const onCommentDelete = (id: number) => {
    deleteComment(id)
      .then(() => {
        getPostComments(selectedPostId)
          .then(updatedComments => setComments(updatedComments));
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails?.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={onChange}
          >
            {isButtonVisible
              ? 'Hide comments'
              : 'Show comments'}
          </button>
        )}
        <ul className="PostDetails__list">
          {isButtonVisible && (
            <>
              {comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => onCommentDelete(comment.id)}
                  >
                    X
                  </button>
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addNewComment={onCommentAdd}
          />
        </div>
      </section>
    </div>
  );
};
