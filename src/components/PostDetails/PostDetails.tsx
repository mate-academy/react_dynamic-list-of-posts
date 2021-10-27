import React, { useEffect, useState } from 'react';
import { addPostComment, deletePostComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/post';
import { Post, Comment } from '../../react-app-env';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetail, setPostDetail] = useState<Post>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    userId: 0,
    title: '',
    body: '',
  });

  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isVisible, toggleVisibility] = useState(true);

  const handlePostComments = () => {
    getPostComments(postId)
      .then(result => setPostComments(result));
  };

  useEffect(() => {
    getPostDetails(postId)
      .then(result => setPostDetail(result));

    handlePostComments();
  }, [postId]);

  const deleteComment = async (commentId: number) => {
    await deletePostComment(commentId);
    handlePostComments();
  };

  const addComment = async (name: string, email: string, body: string) => {
    await addPostComment(postId, name, email, body);
    handlePostComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{postDetail.body}</p>
      </section>
      <section className="PostDetails__comments">
        {postComments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => toggleVisibility(!isVisible)}
          >
            {isVisible ? 'Hide ' : 'Show '}
            {postComments.length}
            {' comments'}
          </button>
        )}
        {isVisible
        && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
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
          <NewCommentForm onCommentAdd={addComment} />
        </div>
      </section>
    </div>
  );
};
