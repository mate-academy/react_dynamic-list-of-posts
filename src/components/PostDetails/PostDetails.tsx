import React, { useEffect, useState } from 'react';
import { getUserComments, setCreateComment, setRemoveComment } from '../../api/api';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postDetails: Post;
};

export const PostDetails: React.FC<Props> = ({ postDetails }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    async function loadComments() {
      const newComments = await getUserComments();

      setComments(newComments.filter(item => item.postId === postDetails.id));
    }

    loadComments();
  }, [postDetails, comments]);

  const createComment = (name: string, email: string, body: string) => {
    const addComment = {
      id: comments.length + 1,
      postId: postDetails.id,
      name,
      email,
      body,
    };

    return setCreateComment(addComment);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        {(comments.length > 0) ? (
          <>
            {showComments ? (
              <>
                <button
                  type="button"
                  className="button"
                  onClick={() => setShowComments(false)}
                >
                  Hide
                  {' '}
                  {comments.length}
                  {' '}
                  comments
                </button>

                <ul className="PostDetails__list">
                  {comments.length !== 0 && (
                    <div>
                      {comments.map(({ body, id }) => (
                        <li
                          key={id}
                          className="PostDetails__list-item"
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => {
                              setRemoveComment(id);
                            }}
                          >
                            X
                          </button>
                          <p>{body}</p>
                        </li>
                      ))}
                    </div>
                  )}
                </ul>
              </>
            ) : (
              <button
                type="button"
                className="button button__margin"
                onClick={() => setShowComments(true)}
              >
                Show
                {' '}
                {comments.length}
                {' '}
                comments
              </button>
            )}
          </>
        ) : (
          <h3>
            We do not have comments
          </h3>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={createComment}
          />
        </div>
      </section>
    </div>
  );
};
