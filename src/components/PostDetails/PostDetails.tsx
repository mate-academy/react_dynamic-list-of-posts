/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { request } from '../../api/api';
import { Post, Comment } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  post?: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isCommentsVisible, setVisibilityOfComments] = useState(true);

  async function finder() {
    if (post) {
      const result = await request(`comments?postId=${post.id}`);

      setCommentsList(result);
    }
  }

  useEffect(() => {
    finder();
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {post
    && (
      <>
        <section className="PostDetails__post">
          <p>{post.title}</p>
        </section>
        <section className="PostDetails__comments">
          {commentsList.length > 0
          && (
            <button
              type="button"
              onClick={() => {
                setVisibilityOfComments(!isCommentsVisible);
              }}
            >
              {(isCommentsVisible)
                ? `Hide ${commentsList.length} comments`
                : `Show ${commentsList.length} comments`}
            </button>
          )}
          <ul className="PostDetails__list">
            { post
            && (isCommentsVisible)
            && (commentsList.map(singleComment => (
              <li key={singleComment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                >
                  X
                </button>
                <p>{post.body}</p>
              </li>
            )))}
          </ul>
        </section>
        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm />
          </div>
        </section>
      </>
    )}
    </div>

  );
};
