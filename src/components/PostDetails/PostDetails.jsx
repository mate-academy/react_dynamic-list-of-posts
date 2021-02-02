import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { Comment } from '../Comment';
import './PostDetails.scss';

export const PostDetails = ({
  post,
  comments,
  loader,
  onDeleteComment,
  onLoadComments,
  onAddComment,
}) => {
  const [isHideComments, setIsHideComments] = useState(false);
  const { body } = post;

  useEffect(() => {
    setIsHideComments(false);
  }, [post.id]);

  useEffect(() => {
    updateComments();
  });

  const updateComments = () => {
    onLoadComments(post.id);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsHideComments(current => !current);
            updateComments();
          }}
        >
          {`${isHideComments ? 'Show' : 'Hide'} ${comments.length} comments`}
        </button>

        {/*{loader && <Loader />}*/}
        {!isHideComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <Comment
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                />
              </li>
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={post.id} createComment={onAddComment} />
        </div>
      </section>
    </div>
  );
};
