/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetailes } from '../../api/posts';
import { getComments } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  id: number;
};

export const PostDetails: React.FC<Props> = ({ id }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentHidden, setIsCommentHidden] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const [currentPost, currentComments] = await Promise.all([
        getPostDetailes(id),
        getComments(id),
      ]);

      setPost(currentPost);
      setComments(currentComments);
    }

    fetchPost();
  }, [id]);

  const toggleCommentsDisplay = () => {
    setIsCommentHidden(!isCommentHidden);
  };

  console.log(isCommentHidden);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={toggleCommentsDisplay}
        >
          {isCommentHidden
            ? `Show ${comments.length} comments`
            : `Hide ${comments.length} comments`}
        </button>
        {!isCommentHidden && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item">
                <button
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
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
