/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getPostComments, getPostDetails, removeComment } from '../../api/posts';
import { Post } from '../../types/types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [postComments, setPostComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(true);
  const [watchComment, setWatchComment] = useState(false);

  useEffect(() => {
    getPostDetails(props.selectedPostId)
      .then(result => setPostDetails(result));

    getPostComments(props.selectedPostId)
      .then(result => setPostComments(result));
  }, [props.selectedPostId, watchComment]);

  const updateComments = () => {
    getPostComments(props.selectedPostId)
      .then(result => setPostComments(result));

    setWatchComment(!watchComment);
  };

  return (
    <div className="PostDetails">
      <h3>{`Post details (id ${postDetails?.id}):`}</h3>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {(postComments.length && (
          <button
            type="button"
            className="button"
            onClick={() => setToggleComments(!toggleComments)}
          >
            {`${toggleComments ? 'Hide' : 'Show'} `
              + `${postComments.length} comment(s)`}
          </button>
        )) || 'No comments yet'}

        <ul className="PostDetails__list">

          {toggleComments && (
            postComments.map((comment: any) => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  id={comment.id}
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(comment.id);
                    updateComments();
                  }}
                >
                  X
                </button>

                <div>{`Comment by ${comment.email}`}</div>
                <div>{`Name: ${comment.name}`}</div>
                <div>{`Body: ${comment.body}`}</div>

              </li>
            ))
          )}

        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={props.selectedPostId}
            updateComments={updateComments}
          />
        </div>
      </section>
    </div>
  );
};
