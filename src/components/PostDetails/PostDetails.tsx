import React, { useEffect, useState } from 'react';
import { getPostComments, deleteComment, postComment } from '../../api/comment';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { Comment } from '../../types/Comment';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const initialComment: Comment[] = [];
  const [details, setDetails] = useState(null);
  const [comments, setComments] = useState(initialComment);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDetails = await getPostDetails(postId);

        setDetails(postDetails);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching posts');
      }
    };

    const fetchPostComments = async () => {
      try {
        const commentsFromServer = await getPostComments(postId);

        setComments(commentsFromServer);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('An error has occurred when fetching post comments');
      }
    };

    Promise.all([fetchPostDetails(), fetchPostComments()]);
  }, [postId]);

  const toggleVisibility = () => {
    setVisible(current => !current);
  };

  const remove = (commentId: number) => {
    deleteComment(commentId);
    setComments(
      currentComments => currentComments.filter(
        comment => commentId !== comment.id,
      ),
    );
  };

  const addComment = (
    event: React.FormEvent<HTMLFormElement>,
    comment: Comment,
  ) => {
    event.preventDefault();

    postComment(comment);
    setComments(existComments => [...existComments, comment]);
  };

  if (details && postId !== 0) {
    const { title } = details;

    return (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{title}</p>
        </section>

        <section className="PostDetails__comments">
          {comments.length ? (
            <button
              type="button"
              className="button"
              onClick={toggleVisibility}
            >
              {isVisible ? 'Hide' : 'Show'}
            </button>
          ) : (
            <p>No comments...</p>
          )}

          {isVisible && (
            <ul className="PostDetails__list">
              {comments.length > 0 && comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => remove(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.name}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm postId={postId} addComment={addComment} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <p>No user selected</p>
  );
};
