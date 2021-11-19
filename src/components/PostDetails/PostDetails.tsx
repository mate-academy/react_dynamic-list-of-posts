import React, { useEffect, useState } from 'react';
import { getPostComments, getPostDetails, removeComment } from '../../api/posts';
import { Post, PostComment } from '../../types/types';
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
      .then(setPostDetails);

    getPostComments(props.selectedPostId)
      .then(setPostComments);
  }, [props.selectedPostId, watchComment]);

  const updateComments = () => {
    getPostComments(props.selectedPostId)
      .then(setPostComments);

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
            postComments.map((comment: PostComment) => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  id={comment.id.toString()}
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
