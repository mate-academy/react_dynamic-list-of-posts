import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment, addComment } from '../../api/api';

interface Props {
  post: Post,
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [showComments, setShowComments] = useState(false);

  async function removeComment(id:number) {
    await deleteComment(id);

    getPostComments(post.id)
      .then(com => {
        setComments(com);
      });
  }

  async function writeComment(newComment: AddComment) {
    await addComment(newComment);

    getPostComments(post.id)
      .then(com => {
        setComments(com);
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
        {comments?.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => {
              setShowComments(state => !state);
            }}
          >
            {showComments ? ' Hide' : 'Show'}
            {' '}
            {comments.length}
            {' '}
            comments
          </button>
        )}

        {showComments
            && (
              <ul className="PostDetails__list">
                {comments?.map(({ body, id }) => (
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
            id={post.id}
          />
        </div>
      </section>
    </div>
  );
};
