import React, { useState, useEffect } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type PostProps = {
  postId: number,
  content: string,
  areCommentsChanged: boolean,
  changeCommentsState: () => void,
};

export const PostDetails: React.FC <PostProps> = ({
  postId,
  content,
  areCommentsChanged,
  changeCommentsState,
}) => {
  const [areCommentsVisible, setAreCommentsVisible] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);

  const reloadComments = async () => {
    const postCommentsFS = await getPostComments(postId);

    setComments(postCommentsFS);
  };

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
    reloadComments();
    changeCommentsState();
  };

  const removeComment = (commentId: number, reloading: () => void) => {
    deleteComment(commentId);
    reloading();
    changeCommentsState();
  };

  useEffect(() => {
    getPostComments(postId).then(commentsArr => setComments(commentsArr));
  }, [postId, areCommentsChanged]);

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
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          removeComment(comment.id, reloadComments);
                        }}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))
                }
              </ul>
            )
        }

      </section>

      <section>
        <div
          className={
            postId < 1
              ? 'PostDetails__form-wrapper Hidden'
              : 'PostDetails__form-wrapper'
          }
        >
          <NewCommentForm
            currentPostId={postId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
