/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../react-app-env';
import { setComments } from '../../store';
import { getComments, getPostDetailsId } from '../../store/selectors';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const [postDetails, setPostDetails] = useState<Post>();
  const [visible, setVisible] = useState(true);
  const comments = useSelector(getComments);
  const postId = useSelector(getPostDetailsId);

  useEffect(() => {
    getPostDetails(postId)
      .then(response => setPostDetails(response));

    getPostComments(postId)
      .then(response => dispatch(setComments(response)));
  }, [postId]);

  const delComment = async (id: number) => {
    await deleteComment(id);
    const newComments = await getPostComments(postId);

    dispatch(setComments(newComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetails?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0
          ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                visible ? setVisible(false) : setVisible(true);
              }}
            >
              {visible ? `Hide ${comments.length} comments` : `Show ${comments.length} comments`}
            </button>
          )
          : (<h3>No comments</h3>)}

        {visible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => delComment(comment.id)}
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
