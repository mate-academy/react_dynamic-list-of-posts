import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { comments } from '../../api/LocalData/comments';

type Props = {
  post: Post | undefined;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [commentsList, setCommentsList] = useState<Comment[] | undefined>([]);
  const [visiblecomments, setVisiblecomments] = useState(false);

  const findcomments = () => {
    const result = post
      ? comments.filter(co => post.id === co.postId)
      : undefined;

    setCommentsList(result);
  };

  const deletecomment = (id: number) => {
    if (commentsList) {
      const index = commentsList.findIndex(item => item.id === id);

      commentsList.splice(index, 1);
      const copy = [...commentsList];

      setCommentsList(copy);
    }
  };

  useEffect(() => {
    findcomments();
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {post && (
        <>
          <section className="PostDetails__post">
            <p>
              {post?.title}
            </p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisiblecomments(!visiblecomments);
              }}
            >
              {commentsList && ((visiblecomments)
                ? `Show ${commentsList.length} comments`
                : `Hide ${commentsList.length} comments`)}
            </button>
            <ul
              className={visiblecomments
                ? 'PostDetails__visiblelist'
                : 'PostDetails__list'}
            >
              {commentsList && commentsList.map(comm => (
                <li
                  className="PostDetails__list-item"
                  key={comm.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deletecomment(comm.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comm.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                commentsList={commentsList}
                setCommentsList={setCommentsList}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
