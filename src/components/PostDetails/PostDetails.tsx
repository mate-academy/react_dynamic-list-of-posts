import React, { useState, useEffect, useCallback } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { getComments, deleteComment } from '../../api/comments';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number;
  toggleDetails: boolean;
  toggleShowDetailsHandler: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPostId,
  toggleDetails,
  toggleShowDetailsHandler,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();
  const [showCommets, setShowCommets] = useState(false);
  const [reload, setReload] = useState(false);

  const changeReload = () => {
    setReload(prevState => !prevState);
  };

  const visibleComments = () => {
    setShowCommets(prevState => !prevState);
  };

  const fetch = useCallback(async () => {
    const [postComment, postDetails] = await Promise.all([
      getComments(selectedPostId), getPostDetails(selectedPostId),
    ]);

    setComments(postComment);
    setPost(postDetails);
    toggleShowDetailsHandler(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [selectedPostId, reload, toggleDetails]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {toggleDetails
        ? <Loader />
        : (
          <>
            <section className="PostDetails__post">
              <p>{post?.body}</p>
            </section>

            <section className="PostDetails__comments">
              {comments.length > 0
                ? (
                  <button
                    type="button"
                    className="button"
                    onClick={visibleComments}
                  >
                    {
                      `${showCommets ? 'Show' : 'Hide'}
                    ${comments.length}
                    ${comments.length > 1 ? 'comments' : 'comment'}`
                    }
                  </button>
                )
                : (
                  <p className="PostDetails__comments--no-comments">
                    So far, no comments...
                  </p>
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
                        onClick={async () => {
                          await deleteComment(comment.id);
                          changeReload();
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
            selectedPostId={selectedPostId}
            changeReload={changeReload}
          />
        </div>
      </section>
    </div>
  );
});
