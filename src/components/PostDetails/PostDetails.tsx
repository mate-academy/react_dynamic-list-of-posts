import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

type Props = {
  postId: number;
  toggleComments: boolean;
  toggleCommentsChahgeHandler: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  postId,
  toggleComments,
  toggleCommentsChahgeHandler,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();
  const [showCommets, setShowCommets] = useState(false);
  const [reload, setReload] = useState(false);

  const changeReload = () => {
    setReload(curr => !curr);
  };

  useEffect(() => {
    Promise.all([
      getComments(postId).then(setComments),
      getPostDetails(postId).then(setPost),
    ]).then(() => {
      toggleCommentsChahgeHandler(false);
    });
  }, [postId, reload, toggleComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {toggleComments
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
                  onClick={() => setShowCommets(curr => !curr)}
                >
                  {
                    `${showCommets ? 'Show' : 'Hide'}
                  ${comments.length}
                  ${comments.length > 1 ? 'comments' : 'comment'}`
                  }
                </button>
              )}

              {!showCommets && (
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
                              changeReload();
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
            changeReload={changeReload}
          />
        </div>
      </section>
    </div>
  );
});
