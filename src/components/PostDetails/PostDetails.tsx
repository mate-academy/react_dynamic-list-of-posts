/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { deleteRequest } from '../../api/api';
import { getPostComments } from '../../api/comments';
import { Post, Comment } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isCommentsVisible, setVisibilityOfComments] = useState(true);
  const [needToUpdate, setNeedToUpdate] = useState(false);

  async function finder() {
    const result = await getPostComments(post.id);

    setCommentsList(result);
  }

  useEffect(() => {
    finder();
    setVisibilityOfComments(true);
  }, [post, needToUpdate]);

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
                ? 'Hide comments'
                : 'Show comments'}
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
                  onClick={async () => {
                    await deleteRequest(`comments/${singleComment.id}`);
                    setNeedToUpdate(!needToUpdate);
                  }}
                >
                  X
                </button>
                <p>{singleComment.body}</p>
              </li>
            )))}
          </ul>
        </section>
        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              currentPostId={post.id}
              needToUpdate={needToUpdate}
              setNeedToUpdate={setNeedToUpdate}
            />
          </div>
        </section>
      </>
    )}
    </div>

  );
};
