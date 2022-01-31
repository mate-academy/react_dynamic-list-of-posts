import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface Comment {
  id: number,
  postId: number,
  body: string,
}

type Props = {
  postDetails: Post,
  selectedPostId: number,
  getCommentsFromServer: (commentsId: number) => void,
  comments: Comment[] | null,
};

export const PostDetails: React.FC<Props> = ({
  postDetails,
  selectedPostId,
  getCommentsFromServer,
  comments,
}) => {
  const [commentsId, setCommentsId] = useState(selectedPostId);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      {commentsId !== 0 ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => {
              getCommentsFromServer(selectedPostId);
              setCommentsId(0);
            }}
          >
            Show comments
          </button>
          {comments
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          ;
        </section>
      ) : (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => {
              getCommentsFromServer(-1);
              setCommentsId(selectedPostId);
            }}
          >
            Hide comments
          </button>
          {comments
            && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          ;
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
