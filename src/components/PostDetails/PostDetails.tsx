import React, { useEffect, useState } from 'react';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { getPostDetail } from '../../api/post';
import { Comment, Post } from '../../react-app-env';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};
export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostDetail(selectedPostId)
      .then(postFromServer => setPost(postFromServer));
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPostId]);

  const remove = (commentId: number) => {
    setLoading(true);
    deleteComment(commentId);
    setComments(prev => prev.filter(value => value.id !== commentId));
    setLoading(false);
  };

  const create = (name: string, email: string, body: string) => {
    setLoading(true);
    createComment(selectedPostId, name, email, body)
      .then(responce => setComments(prev => [...prev, responce]));
    setLoading(false);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsOpenComment(value => !value)}
        >
          {isOpenComment ? 'Hide' : 'Show'}
          {` ${comments.length} comments`}
        </button>

        {isOpenComment
          && (
            <ul className="PostDetails__list">
              {
                comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => remove(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))
              }
            </ul>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm create={create} />
          {loading && <Loader />}
        </div>
      </section>
    </div>
  );
};
