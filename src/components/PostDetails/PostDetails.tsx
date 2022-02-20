import React, { useEffect, useState } from 'react';
import {
  getPostComments,
  getPostDetails,
  deleteComment,
  createComment,
} from '../../api/api';
import { CommentsList } from '../CommentsList/CommentsList';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommets, setShowCommets] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(el => {
        setDetails(el);
        setLoading(false);
      });

    getPostComments(postId)
      .then(el => {
        setComments([...el]);
      });
  }, [postId]);

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(result => {
        if (result) {
          setComments(commentsArray => commentsArray.filter(comment => comment.id !== commentId));
        }
      });
  };

  const addComment = (comment: Comment) => {
    createComment(comment)
      .then(result => setComments([...comments, result]));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="PostDetails">
      <h2>{`Post details: ${comments.length}`}</h2>

      <section className="PostDetails__post">
        <p>{details?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setShowCommets(!showCommets)}
            >
              {showCommets
                ? `Hide ${comments.length} comments`
                : `Show ${comments.length} comments`}
            </button>

            {showCommets && <CommentsList comments={comments} removeComment={removeComment} />}
          </>
        ) : (<p>No comments yet</p>)}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
