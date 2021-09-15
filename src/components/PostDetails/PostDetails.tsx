import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addCommentToServer } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [details, setDetails] = useState({} as Post);
  const [comments, setComments] = useState([] as Comment[]);
  const [commentsDisplay, setCommentsDisplay] = useState(true);
  const [loading, setLoadingStatus] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(response => {
        setDetails(response);
        setLoadingStatus(false);
      });
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(response => setComments([...response]));
  }, [selectedPostId]);

  const handleRemove = (id: number) => {
    deleteComment(id)
      .then(() => getPostComments(selectedPostId))
      .then(updatedComments => setComments(updatedComments));
  };

  const addComment = (newComment: Comment) => {
    addCommentToServer(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(updatedComments => setComments(updatedComments));
  };

  const showComments = () => {
    if (commentsDisplay) {
      setCommentsDisplay(false);
    } else {
      setCommentsDisplay(true);
    }
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loading && (
        <Loader />
      )}

      <section className="PostDetails__post">
        <p>
          {details.body}
        </p>
      </section>

      {comments.length > 0 && (
        <>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => showComments()}
            >
              {commentsDisplay ? (
                `Hide ${comments.length} comments`
              ) : (
                'Show comments'
              )}
            </button>

            {commentsDisplay && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleRemove(comment.id)}
                    >
                      X
                    </button>
                    <p>
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            postNewComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};
