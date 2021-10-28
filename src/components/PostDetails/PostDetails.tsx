import React, { useEffect, useState } from 'react';
import {
  getPostComments,
  deleteComment,
} from '../../api/comments';
import {
  getPostDetails,
} from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number | null,
};

export const PostDetails: React.FC<Props> = ({
  postId,
}) => {
  const [postDetail, addDetails] = useState<Post | null>(null);
  const [postComments, addComments] = useState<Comment[] | null>(null);
  const [hiddenComment, hiddenComments] = useState(false);

  useEffect(() => {
    getPostDetails(`${postId}`).then(promise => {
      addDetails(promise);
    });

    getPostComments(`${postId}`).then(promise => {
      addComments(promise);
    });
  }, [postId, postComments]);

  const deleteCommentFromServer = (commentId: number) => {
    deleteComment(commentId);
  };

  return (
    <div className="PostDetails">
      <h2>{`Post details: ${postComments?.length}`}</h2>

      <section className="PostDetails__post">
        <p>{postDetail?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {
          (postComments !== null && postComments.length > 0) && (
            <button
              onClick={() => hiddenComments(!hiddenComment)}
              type="button"
              className="button"
            >
              {`Hide ${postComments?.length} comments`}
            </button>
          )
        }

        {
          !hiddenComment && (
            <ul className="PostDetails__list">
              {
                postComments?.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      onClick={() => deleteCommentFromServer(comment.id)}
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))
              }
            </ul>
          )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postIdId={postId} />
        </div>
      </section>
    </div>
  );
};
