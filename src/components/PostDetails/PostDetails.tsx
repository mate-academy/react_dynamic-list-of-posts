import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post, Comment } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHiden, setIsHiden] = useState(false);
  // const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    getPostDetails(selectedPostId).then(response => {
      setIsLoading(true);
      setPostDetails(response);
    });
    if (selectedPostId !== 0) {
      getPostComments(selectedPostId).then(setComments);
    }
  }, [selectedPostId]);

  const removeHandle = (commentId: number) => {
    removeComment(commentId)
      .then(() => getPostComments(selectedPostId).then(setComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isLoading ? (
        <>
          <section className="PostDetails__post">
            {postDetails && <p>{postDetails.body}</p>}
          </section>

          <section className="PostDetails__comments">
            {!!selectedPostId && !!comments?.length && (
              <button
                type="button"
                className="button"
                onClick={() => setIsHiden(!isHiden)}
              >
                {!isHiden ? `show ${comments.length} comments` : `hide ${comments.length} comments`}
              </button>
            )}

            {isHiden && (
              <ul className="PostDetails__list">
                {comments?.map((comment) => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeHandle(comment.id)}
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
              <NewCommentForm
                postId={selectedPostId}
                commentId={comments[comments?.length - 1]?.id}
                setComments={setComments}
              />
            </div>
          </section>
        </>
      ) : (
        <CircularProgress />
      )}

    </div>
  );
};
