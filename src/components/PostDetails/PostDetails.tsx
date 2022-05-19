import React, { useEffect, useState } from 'react';
import { Post, Comment } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import {
  addPostComent,
  getPostComments,
  removeComments,
} from '../../api/comments';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [showBtn, setShowBtn] = useState(true);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);

  const handleDeleteComment = async (commentId: number) => {
    await removeComments(commentId);

    const commentsFromServer = await getPostComments(postId);

    setPostComments(commentsFromServer);
  };

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    await addPostComent(postId, name, email, body);

    const commentsFromServer = await getPostComments(postId);

    setPostComments(commentsFromServer);
  };

  useEffect(() => {
    getPostComments(postId).then(setPostComments);

    getPostDetails(postId).then(setPostDetails)
      .catch(() => setPostDetails(null));
  }, [postId]);

  const toogleBtn = () => {
    setShowBtn(!showBtn);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postDetails && (
        <section className="PostDetails__post">
          <h4>{postDetails.title}</h4>
          <p>{postDetails.body}</p>
        </section>
      )}

      {postComments && (
        <section className="PostDetails__comments">

          <button
            type="button"
            className="button"
            hidden={!showBtn}
            onClick={toogleBtn}
          >
            {`Hide ${postComments.length} comments`}
          </button>

          <button
            type="button"
            className="button"
            hidden={showBtn}
            onClick={toogleBtn}
          >
            {`Show ${postComments.length} comments`}
          </button>

          {showBtn && (
            <ul className="PostDetails__list">
              {postComments.map((comment: Comment) => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      removeComments(comment.id);
                      handleDeleteComment(comment.id);
                    }}
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
          <NewCommentForm handleAddComment={handleAddComment} />
        </div>
      </section>
    </div>
  );
};
