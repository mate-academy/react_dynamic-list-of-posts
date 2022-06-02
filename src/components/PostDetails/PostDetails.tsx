import React, { useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { addComment, deleteComment } from '../../api/posts';
import './PostDetails.scss';

type Props = {
  postDetails: Post,
  postsComments: CommentInfo[],
  setPostsComments: (comments: CommentInfo[]) => void,
};

export const PostDetails: React.FC<Props> = ({
  postDetails,
  postsComments,
  setPostsComments,
}) => {
  const [visibleComments, setVisibleComments] = useState(true);

  const addNewComment = (data: Partial<CommentInfo>) => {
    addComment(data)
      .then(response => setPostsComments([...postsComments, response]));
  };

  const deleteCommentServer = async (commentId: number) => {
    await deleteComment(commentId);
    setPostsComments(postsComments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {postDetails?.body}
        </p>
      </section>

      {postDetails ? (
        <section className="PostDetails__comments">
          {visibleComments ? (
            <button
              type="button"
              className="button"
              onClick={() => setVisibleComments(!visibleComments)}
            >
              Hide&nbsp;
              {postsComments.length}
              &nbsp;comments
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={() => setVisibleComments(!visibleComments)}
            >
              Show&nbsp;
              {postsComments.length}
              &nbsp;comments
            </button>
          )}

          <ul className="PostDetails__list">
            {visibleComments && postsComments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteCommentServer(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>

        </section>
      ) : (
        <section>
          <h5>No selected post</h5>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addNewComment={addNewComment}
            postId={postDetails.id}
          />
        </div>
      </section>
    </div>
  );
};
