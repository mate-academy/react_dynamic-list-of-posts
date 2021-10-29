import React, { useEffect, useState } from 'react';

import {
  addComment, deleteComment, getPostComments,
} from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisiableButton, setVisible] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(postsDetails => setPostDetails(postsDetails));

    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPostId]);

  const handleChange = () => {
    setVisible(!isVisiableButton);
  };

  const addNewComment = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(() => {
        getPostComments(selectedPostId).then(updateComments => setComments(updateComments));
      });
  };

  const removeComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        getPostComments(selectedPostId).then(updateComments => setComments(updateComments));
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={handleChange}
          >
            {isVisiableButton
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}
        <ul className="PostDetails__list">
          {isVisiableButton && (
            <>
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
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
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
