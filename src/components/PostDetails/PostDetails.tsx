/* eslint-disable no-console */
/* eslint-disable padded-blocks */
import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails, getPostComments } from '../../api/posts';
import './PostDetails.scss';

type Props = {
  postId: number;
};

type Comment = {
  id: number;
  title: string;
  body: string;
};

export const PostDetails: React.FC <Props> = ({ postId }) => {
  const [details, setDetails] = useState({
    title: '',
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    getPostComments(postId)
      .then(postFromServer => {
        setComments(postFromServer);
      });

    getPostDetails(postId)
      .then(postFromServer => {
        setDetails(postFromServer);
      });
  }, [postId]);

  const updateComments = () => {
    getPostComments(postId)
      .then(postFromServer => {
        setComments(postFromServer);
      });
    console.log('comments updated');
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length !== 0 && (
          <>
            {(commentsVisible) ? (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setCommentsVisible(false);
                }}
              >
                {`Hide ${comments.length} comments`}
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setCommentsVisible(true);
                }}
              >
                {`Open ${comments.length} comments`}
              </button>
            )}
          </>
        )}

        {(comments.length !== 0 && commentsVisible) && (
          <ul className="PostDetails__list">
            {comments.map((comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    setComments(prev => [...prev].filter(
                      com => com.id !== comment.id,
                    ));
                  }}
                >
                  X
                </button>
                {comment.body}
              </li>
            )))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            onAdd={updateComments}
          />
        </div>
      </section>
    </div>
  );
};
