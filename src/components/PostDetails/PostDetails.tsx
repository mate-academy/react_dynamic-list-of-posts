import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import './PostDetails.scss';

type Props = {
  postDetails: Post,
  comments: Comment[],
  removeComment: any,
  addComment: any,
};

export const PostDetails: React.FC<Props> = ({
  postDetails,
  removeComment,
  comments,
  addComment,
}) => {
  const [showComments, setShowingComments] = useState(true);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{`Tittle: ${postDetails.title}`}</p>
      </section>

      <section className="PostDetails__post">
        <p>{`Body: ${postDetails.body}`}</p>
      </section>

      <section className="PostDetails__comments">
        {(comments.length !== 0) && ((comments.length === 1)
          ? (
            <button onClick={() => setShowingComments(!showComments)} type="button" className="button">
              {!showComments ? 'Show' : 'Hide'}
              {' '}
              1 comment
            </button>
          )
          : (
            <button onClick={() => setShowingComments(!showComments)} type="button" className="button">
              {!showComments ? 'Show' : 'Hide'}
              {' '}
              {`${comments.length} comments`}
            </button>
          ))}

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map((comment: { id: number, body: string }) => {
              return (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      removeComment(comment.id);
                    }}
                  >
                    X
                  </button>

                  <p>{comment.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} />
        </div>
      </section>
    </div>
  );
};
