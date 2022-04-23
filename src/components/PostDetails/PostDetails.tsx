import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

type Props = {
  postId: number;
  isClicked: boolean;
  changeIsClicked: (v: boolean) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  postId,
  isClicked,
  changeIsClicked,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();
  const [isHideCommets, setIsHideCommets] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const changeIsReload = () => {
    setIsReload(curr => !curr);
  };

  const changeIsHideCommets = () => {
    setIsHideCommets(curr => !curr);
  };

  useEffect(() => {
    Promise.all([
      getComments(postId).then(setComments),
      getPostDetails(postId).then(setPost),
    ]).then(() => {
      changeIsClicked(false);
    });
  }, [postId, isReload, isClicked]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isClicked
        ? <Loader />
        : (
          <>
            <section className="PostDetails__post">
              <p>{post?.body}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length > 0 && (
                <button
                  type="button"
                  className="button"
                  onClick={changeIsHideCommets}
                >
                  {
                    `${isHideCommets ? 'Show' : 'Hide'}
                  ${comments.length}
                  ${comments.length > 1 ? 'comments' : 'comment'}`
                  }
                </button>
              )}

              {!isHideCommets && (
                <ul className="PostDetails__list">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="PostDetails__list-item"
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => {
                          deleteComment(comment.id)
                            .then(() => {
                              changeIsReload();
                            });
                        }}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            changeIsReload={changeIsReload}
          />
        </div>
      </section>
    </div>
  );
});
