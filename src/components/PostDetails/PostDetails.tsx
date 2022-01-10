import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { Loader } from '../Loader/Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, postComment } from '../../api/comments';
import { Post, Comment } from '../../react-app-env';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<null | Post>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsVisible, setCommentsVisible] = useState(true);
  const [isCommentLoading, setCommentLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const postFromServer = await getPostDetails(selectedPostId);

      setPost(postFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      setComments(commentsFromServer);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const deleteCommentFromServer = async (commentId: number) => {
    setCommentLoading(true);
    deleteComment(commentId);
    await fetchComments();
    setCommentLoading(false);
  };

  const postCommentToServer = async (comment: Omit<Comment, 'id'>) => {
    try {
      postComment(comment);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    setPost(null);
    fetchComments();
    fetchPost();
  }, [selectedPostId]);

  return (
    !post ? (
      <Loader />
    ) : (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <h3 className="PostDetails__title">{post.title}</h3>
          <p>{post.body}</p>
        </section>

        <section className="PostDetails__comments">
          {isCommentLoading && (
            <div className="PostDetails__loader">
              <Loader />
            </div>
          )}
          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisible(!isCommentsVisible)}
          >
            {isCommentsVisible ? 'Hide comments' : 'Show comments'}
          </button>

          {isCommentsVisible && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteCommentFromServer(comment.id)}
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
              postComment={postCommentToServer}
              selectedPostId={selectedPostId}
              updateComments={fetchComments}
              setCommentLoading={setCommentLoading}
            />
          </div>
        </section>
      </div>
    )
  );
};
