import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getComments, deleteComment } from '../../api/comments';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {
    getComments(post.id).then(foundComments => setComments(foundComments));
  }, [comments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          onClick={() => setIsHidden(!isHidden)}
          type="button"
          className="button"
        >
          {`Hide ${comments.length} comments`}
        </button>
        {isHidden && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  onClick={() => deleteComment(comment.id)}
                  type="button"
                  className="PostDetails__remove-button button"
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
          <NewCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
};
