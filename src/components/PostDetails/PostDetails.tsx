import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment, addComment } from '../../api/api';

interface Props {
  post: Post,
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comment, setComment] = useState<Comment[] | []>([]);
  const [showComments, setShowComments] = useState(false);

  async function removeComment(id:number) {
    await deleteComment(id);

    getPostComments(post.id)
      .then(com => {
        setComment(com);
      });
  }

  async function writeComment(newComment: AddComment) {
    await addComment(newComment);

    getPostComments(post.id)
      .then(com => {
        setComment(com);
      });
  }

  useEffect(() => {
    removeComment(post.id);
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>
        Post details:

      </h2>
      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comment?.length !== 0 && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setShowComments(state => !state);
            }}
          >
            {showComments ? ' Hide' : 'Show'}
            {' '}
            {comment.length}
            {' '}
            comments
          </button>
        )}

        {showComments
            && (
              <ul className="PostDetails__list">
                {comment?.map(({ body, id }) => (
                  <li key={id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(id);
                      }}
                    >
                      X
                    </button>
                    <p>{body}</p>
                  </li>
                ))}
              </ul>
            )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={(newComment: AddComment) => {
              writeComment(newComment);
            }}
            postId={post.id}
          />
        </div>
      </section>
    </div>
  );
};
