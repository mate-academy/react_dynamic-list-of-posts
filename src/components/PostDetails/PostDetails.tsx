import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import {
  deleteComment,
  getPostComments,
  postNewComment,
} from '../../api/comments';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({
  postId,
}) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [postDetail, setPost] = useState<Posts | null>(null);
  const [hideComments, setHideComments] = useState(false);

  const loadPost = async () => {
    const post = await getPostDetails(postId);

    setPost(post);
  };

  const loadComments = async () => {
    const commentsList = await getPostComments(postId);

    setComments(commentsList);
  };

  const createComment = (body: string, email: string, userName: string) => {
    postNewComment(postId, body, email, userName);

    const newComment = {
      id: Date.now(),
      postId,
      body,
      email,
      name: userName,
    };

    setComments(prevState => ([
      ...prevState,
      newComment,
    ]));
  };

  const deletingComment = (id: number) => {
    deleteComment(id);

    setComments(prevState => prevState.filter(comment => comment.id !== id));
  };

  useEffect(() => {
    setPost(null);
    setComments([]);
    loadPost();
    loadComments();
  }, [postId]);

  const visiblityOfComments = () => {
    setHideComments(prevState => !prevState);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetail && (
        <>
          <section className="PostDetails__post">
            <p>
              {postDetail.body}
            </p>
          </section>

          <section className="PostDetails__comments">
            {comments.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={visiblityOfComments}
              >
                {hideComments ? 'Show ' : 'Hide '}
                {comments.length}
                {comments.length > 1 ? ' comments' : ' comment'}
              </button>
            )}
            {!hideComments && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    key={comment.id}
                    className="PostDetails__list-item"
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deletingComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                createComment={createComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
