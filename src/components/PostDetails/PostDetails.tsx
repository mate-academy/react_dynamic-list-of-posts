import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { Post, Comment } from '../../types/types';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postInfo, setPostInfo] = useState<Post>({} as Post);
  const [comments, setComments] = useState<Comment[]>([] as Comment[]);
  const [commentVisibility, setCommentVisibility] = useState(true);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPostInfo(result));
  }, [postId]);

  useEffect(() => {
    getPostComments(postId)
      .then(result => setComments([...result]));
  }, [postId]);

  const commentDisplay = () => {
    return commentVisibility
      ? setCommentVisibility(false)
      : setCommentVisibility(true);
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => getPostComments(postId)
        .then(result => setComments(result)));
  };

  const addNewComment = (newComment: Comment) => {
    addComment(newComment)
      .then(() => getPostComments(postId)
        .then(result => setComments(result)));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>
          {postInfo.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0
          ? (
            <button
              type="button"
              className="button"
              onClick={commentDisplay}
            >
              {commentVisibility ? 'Hide' : 'Show'}
              {` ${comments.length} `}
              {comments.length === 1 ? 'comment' : 'comments'}
            </button>
          ) : (
            <button
              type="button"
              className="button--no_comments"
              disabled
            >
              No comments yet
            </button>
          )}

        <ul className="PostDetails__list">
          {commentVisibility && (
            comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(comment.id)}
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={postId} addNewComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
