import React, { useState, useMemo, useEffect } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type PostProps = {
  postId: number,
  content: string,
};

export const PostDetails: React.FC <PostProps> = ({
  postId,
  content,
}) => {
  // alert('Post details rendering');

  const [
    areCommentsVisible,
    setAreCommentsVisible,
  ] = useState(true);

  const [
    comments,
    setComments,
  ] = useState<Comment[]>([]);

  const [
    commentsChanged,
    setCommentsChanged,
  ] = useState(false);

  const toggleCommentsVisibility = () => {
    setAreCommentsVisible(prevState => !prevState);
  };

  const addNewComment = (
    event: React.FormEvent<HTMLFormElement>,
    currentPostId: number,
    commentUserName: string,
    commentEmail: string,
    commentText: string,
  ) => {
    event.preventDefault();

    addComment(currentPostId, commentUserName, commentEmail, commentText);
    setCommentsChanged(prevState => !prevState);
  };

  const removeComment = (commentId: number) => {
    deleteComment(commentId);
    setCommentsChanged(prevState => !prevState);
  };

  useEffect(() => {
    getPostComments(postId).then(commentsArr => setComments(commentsArr));
  }, []);

  useMemo(async () => {
    const commentsArr = await getPostComments(postId);

    setComments(commentsArr);
  }, [commentsChanged, postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {content}
        </p>
      </section>

      <section className="PostDetails__comments">

        {
          (comments.length > 0)
          && (
            <button
              type="button"
              className="button"
              onClick={toggleCommentsVisibility}
            >
              {
                areCommentsVisible
                  ? ` Hide ${comments.length} comments`
                  : ` Show ${comments.length} comments`
              }
            </button>
          )
        }

        {
          areCommentsVisible
            && (
              <ul className="PostDetails__list">
                {
                  comments.map(comment => (
                    <>
                      <li
                        key={comment.id}
                        className="PostDetails__list-item"
                      >
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
                    </>
                  ))
                }
              </ul>
            )
        }

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            currentPostId={postId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
