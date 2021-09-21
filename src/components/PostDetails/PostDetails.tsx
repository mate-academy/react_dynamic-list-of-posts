import React, { useState, useEffect } from 'react';
import { getPostComments, deletePostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postDetails: Post,
}

export const PostDetails: React.FC<Props> = ({ postDetails }) => {
  const { id: postId, body: postBody } = postDetails;

  const [comments, setComments] = useState<any[]>([]);
  const [show, setShow] = useState(true);

  const requestGetPostComments = (id: number) => {
    getPostComments(id)
      .then(newComments => {
        setComments(newComments);
      });
  };

  useEffect(() => {
    requestGetPostComments(postId);
  }, [postId]);

  const handleSetShow = () => {
    setShow(prev => !prev);
  };

  const handleDeletePostComments = (commentId: number) => {
    deletePostComments(commentId)
      .then(() => {
        setComments((prevComments: any[]) => {
          return prevComments.filter((comment: any) => comment.id !== commentId);
        });
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postBody}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleSetShow}
        >
          {show ? 'Hide' : 'Show'}
          {` ${comments.length} comments`}
        </button>

        {show && (
          <ul className="PostDetails__list">
            {comments.map(({ id, body }) => (
              <li
                key={id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeletePostComments(id)}
                >
                  X
                </button>
                <p>
                  {body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};
