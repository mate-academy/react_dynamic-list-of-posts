import React, { useEffect, useState } from 'react';
import {
  getPostDetails,
  getPostComments,
  removeComment,
  createComment,
} from '../../api/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVissibleComments, setIsVissibleComments] = useState(false);

  const receiveDetails = () => {
    getPostDetails(selectedPostId)
      .then(postDetail => setPostDetails(postDetail));
  };

  const receiveComments = () => {
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  useEffect(() => {
    receiveDetails();
    receiveComments();
  }, [selectedPostId]);

  const getAllComments = () => {
    setIsVissibleComments(!isVissibleComments);
  };

  const deleteComment = (commentId: number) => {
    removeComment(commentId)
      .then(comment => {
        if (comment) {
          setComments(
            comments.filter(commentItem => commentItem.id !== commentId),
          );
        }
      });
  };

  const addNewComment = (name: string, email: string, body: string) => {
    const newComment: UnpablishedComment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    createComment(newComment)
      .then(comment => {
        setComments(prev => [...prev, comment]);
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
              hidden={comments.length < 1}
              onClick={getAllComments}
            >
              {isVissibleComments ? 'Hide comments' : 'Show comments'}
            </button>
          ) : (
            <p className="PostDetails__list-item">
              There are not any comments
            </p>
          )}
        {isVissibleComments
          && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
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
          <NewCommentForm addComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
