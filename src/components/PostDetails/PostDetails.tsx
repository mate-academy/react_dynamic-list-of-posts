import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line max-len
import { getPostComments, getPostDetails, removeComment } from '../../api/posts';
import { Post } from '../../types/Posts';
import { Comment } from '../../types/Comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostsId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostsId }) => {
  const [details, setDetails] = useState<Post | null>(null);
  const [comment, setComment] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState(false);

  const getDetails = () => {
    getPostDetails(selectedPostsId)
      .then(detail => setDetails(detail));
  };

  const getComments = () => {
    getPostComments(selectedPostsId)
      .then(detail => setDetails(detail));
  };

  const showAllComments = () => {
    setVisibleComments(!visibleComments);
  };

  const addNewComment = (
    name: string,
    email: string,
    body: string,
  ) => {
    setComment((prev) => (
      [...prev,
        {
          id: +uuidv4(),
          postId: selectedPostsId,
          name,
          email,
          body,
        }]
    ));
  };

  useEffect(() => {
    Promise.all([getComments(), getDetails()]);
  }, [selectedPostsId, comment]);

  const deleteComment = (commentId: number) => {
    removeComment(commentId)
      .then(deleteComments => {
        if (deleteComments) {
          setComment(
            comment.filter(com => com.id !== commentId),
          );
        }
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{details?.body}</p>
      </section>
      <section className="PostDetails__comments">
        {comment.length
          ? (
            <button
              type="button"
              className="button"
              hidden={comment.length < 1}
              onClick={showAllComments}
            >
              {`${visibleComments ? 'Hide' : 'Show'}
                ${comment.length}
                ${comment.length < 2 ? 'comment' : 'comments'}`}
            </button>
          ) : (
            <p className="PostDetails__list-item">
              Dont have comments yet!
            </p>
          )}
        {visibleComments
            && (
              <ul
                className="PostDetails__list"
              >
                {comment.map(({ id, body }) => (
                  <li
                    key={id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__x"
                      onClick={() => deleteComment(id)}
                    >
                      Delete
                    </button>
                    <p>
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNew={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
