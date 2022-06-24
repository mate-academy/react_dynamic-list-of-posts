import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment, Post } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [visibleComments, setVisibleComments] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const postHandler = async () => {
    try {
      const postDetails = await getPostDetails(postId);

      setPost(postDetails);
      setHasLoadingError(false);
    } catch (error) {
      setHasLoadingError(true);
      setPost(null);
    }

    try {
      const commentItems = await getPostComments(postId);

      setComments(commentItems);
      setHasLoadingError(false);
    } catch (error) {
      setHasLoadingError(true);
    }
  };

  useEffect(() => {
    postHandler();
  }, [postId]);

  const deleteHandler = async (commentId: number) => {
    if (postId) {
      await deleteComment(commentId);
      const newComments = await getPostComments(postId);

      setComments(newComments);
    }
  };

  const commentsHandler = async () => {
    const newComments = await getPostComments(postId);

    setComments(newComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {hasLoadingError ? (
        <p className="error">An error occurred while loading the data</p>
      ) : (
        <>
          <section className="PostDetails__post">
            <p>{post?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className={classnames('button', {
                noshow: comments.length < 1,
              })}
              onClick={() => {
                setVisibleComments(!visibleComments);
              }}
            >
              {visibleComments ? 'Hide comments' : 'Show comments'}
            </button>
            {visibleComments && (
              <ul className="PostDetails__list">
                {comments?.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteHandler(comment.id)}
                    >
                      X
                    </button>
                    <p>
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              {post && (
                <NewCommentForm
                  postId={postId}
                  onCommentsHandler={commentsHandler}
                />
              )}
            </div>
          </section>
        </>
      )}

    </div>
  );
};
