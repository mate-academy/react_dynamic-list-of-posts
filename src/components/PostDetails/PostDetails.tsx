import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { Post, Comment } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  const requestPost = async () => {
    try {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  const requestComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      setComments(commentsFromServer);
    } catch {
      // eslint-disable-next-line no-console
      console.log('Error');
    }
  };

  useEffect(() => {
    requestPost();
    requestComments();
  }, [selectedPostId]);

  // eslint-disable-next-line no-console
  console.log(comments);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length === 0 && 'No comments'}
        <div className={cn({ hidden: comments.length === 0 })}>
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
              <li key={comment.id}>
                <li className="PostDetails__list-item">
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
              comments={comments}
              onRequest={requestComments}
            />

          )}
        </div>
      </section>
    </div>
  );
};
