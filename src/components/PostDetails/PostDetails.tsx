import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostById } from '../../api/posts';
import { getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<UserPost>();
  const [comments, setComments] = useState<Comment[]>();
  const [isShown, setToggle] = useState(false);

  useEffect(() => {
    if (selectedPostId) {
      getPostById(selectedPostId)
        .then((postFromServer) => setSelectedPost(postFromServer));

      getPostComments(selectedPostId)
        .then((commentsServer) => setComments(commentsServer));
    }

    setToggle(false);
  }, [selectedPostId]);

  const deleteCommentHandler = (commentId: number) => {
    setComments(comments?.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.title}</p>
      </section>

      <section className="PostDetails__comments" data-cy="postDetails">
        <button
          type="button"
          className="button"
          onClick={() => setToggle(!isShown)}
        >
          {isShown ? `Hide ${comments?.length} comments` : 'Show'}
        </button>

        {isShown && (
          <ul className="PostDetails__list">
            {comments?.map((comment) => (
              <li className="PostDetails__list-item" key={comment.id}>
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
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
