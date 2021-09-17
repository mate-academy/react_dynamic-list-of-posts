import React, { useState, useEffect } from 'react';
import {
  addCommentOnServer,
  deleteCommentFromServer,
  getPostComments,
} from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(post => {
        setSelectedPost(post);
      });
    getPostComments(selectedPostId)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      });
  }, [selectedPostId]);

  const handleCommentsHide = () => {
    setIsCommentsHidden(!isCommentsHidden);
  };

  const removeComment = (id: number) => {
    deleteCommentFromServer(id)
      .then(() => getPostComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  const addComment = (newComment: Partial<Comment>) => {
    addCommentOnServer(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  return (
    selectedPost ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{selectedPost?.body}</p>
        </section>

        {comments.length > 0 && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={handleCommentsHide}
            >
              {isCommentsHidden
                ? `Show ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
                : `Hide ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
            </button>

            {!isCommentsHidden && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
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
        )}

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              selectedPostId={selectedPostId}
              onAdd={addComment}
            />
          </div>
        </section>
      </div>
    ) : (
      <Loader />
    )
  );
};
