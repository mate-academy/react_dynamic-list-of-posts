import React, { useState } from 'react';
import { getComments, removeComment } from '../../api/comments';
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
};

export const PostDetails: React.FC<Props> = ({
  postDetails,
  selectedPostId,
}) => {
  const [commentsId, setCommentsId] = useState(selectedPostId);
  const [comments, setComments] = useState([]);

  const getCommentsFromServer = (id: number) => {
    getComments(id).then(commentsList => {
      setComments(commentsList);
    });
  };

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
          {comments.length > 0 && (
            <ul className="PostDetails__list">
              {comments.map((comment: Comment) => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
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
                {comments.map((comment: Comment) => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={async () => {
                        await removeComment(comment.id);
                        await getCommentsFromServer(selectedPostId);
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
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            commentsId={selectedPostId}
            getCommentsFromServer={getCommentsFromServer}
            setCommentsId={setCommentsId}
          />
        </div>
      </section>
    </div>
  );
};
