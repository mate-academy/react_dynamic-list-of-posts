import React, { useEffect, useState } from 'react';
import { deleteComments, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPost: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [commentsList, setCommentsList] = useState<Comments[]>([]);
  const [isHideComment, setIsHideComment] = useState(false);
  const [buttonName, setButtonName] = useState('Hide');

  useEffect(() => {
    if (selectedPost) {
      getPostDetails(selectedPost)
        .then(post => setCurrentPost(post));

      getPostComments(selectedPost)
        .then(comments => setCommentsList(comments));
    }
  }, [selectedPost]);

  const hideShowButtonHandler = () => {
    setIsHideComment(!isHideComment);

    if (isHideComment) {
      setButtonName('Hide');
    } else {
      setButtonName('Show');
    }
  };

  const deleteHandler = (commentId: number) => {
    deleteComments(commentId)
      .then(deletedComment => {
        if (deletedComment) {
          setCommentsList(
            commentsList.filter(comment => comment.id !== commentId),
          );
        }
      });
  };

  const addNewComment = (newComment: Comments) => {
    setCommentsList([
      ...commentsList,
      newComment,
    ]);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{currentPost?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          hidden={commentsList.length === 0}
          onClick={hideShowButtonHandler}
        >
          {`${buttonName} ${commentsList.length}
          ${(commentsList.length === 1) ? 'comment' : 'comments'}` }
        </button>

        {commentsList.length > 0 ? (
          <ul
            className="PostDetails__list"
            hidden={isHideComment}
          >
            {commentsList.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteHandler(comment.id)}
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="PostDetails__list-item"
          >
            No comments yet
          </p>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={currentPost?.id}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
