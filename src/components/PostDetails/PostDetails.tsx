import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment } from '../../api/comments';

interface Props {
  postId: number;
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [showComments, setShowComments] = useState(true);

  // useEffect(() => {
  //   getPostDetails(postId)
  //     .then(response => setPost(response));

  //   getPostComments(postId)
  //     .then(response => setComments(response));
  // }, [postId]);

  const getComments = async () => {
    const response = await getPostComments(postId);

    setComments(response);
  };

  const getDetails = async () => {
    const response = await getPostDetails(postId);

    setPost(response);
  };

  useEffect(() => {
    getComments();
    getDetails();
  }, [postId]);

  const deleteHandler = async (commentId: number) => {
    await deleteComment(commentId);
    const updatedComments = await getPostComments(postId);

    setComments(updatedComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>

        {showComments && (
          <ul className="PostDetails__list" data-cy="postDetails">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deleteHandler(comment.id);
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
          <NewCommentForm
            postId={postId}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
};
