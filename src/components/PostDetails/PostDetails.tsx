import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { Post, Comment } from '../../react-app-env';
import { getPostDetails } from '../../api/posts';
import { deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';

import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState<boolean>(true);

  const requestPost = async () => {
    try {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const requestComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      setComments(commentsFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    requestPost();
    requestComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length === 0 && 'No comments'}
        <div className={
          classnames(
            {
              hidden: comments.length === 0,
            },
          )
        }
        >
          {!showComments
            ? (
              <button
                className="button"
                type="button"
                onClick={() => {
                  setShowComments(true);
                }}
              >
                {`Show ${comments.length} comments`}
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setShowComments(false);
                }}
              >
                {`Hide ${comments.length} comments`}
              </button>
            )}
        </div>

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async () => {
                    await deleteComment(comment.id);
                    await requestComments();
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

      <section>
        <div className="PostDetails__form-wrapper">
          {post && (
            <NewCommentForm
              post={post}
              onRequest={requestComments}
            />

          )}
        </div>
      </section>
    </div>
  );
};
