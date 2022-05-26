/* eslint-disable no-console */
import React, { useEffect, useCallback, useState } from 'react';
import { getPostCommentsById, removePostCommetById } from '../../api/comments';
import { getPostDetailsById } from '../../api/posts';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPostId,
}) => {
  const [selectedPostDetails, setSelectedPostDetails]
    = useState<Post | null>(null);
  const [commentsForSelectedPost, setCommentsForSelectedPost]
    = useState<Array<Comment> | []>([]);
  const [commentsIsShowing, setCommentsIsShowing] = useState(true);
  const [someCommentIsDeleting, setSomeCommentIsDeleting] = useState(false);

  const addSelectedPostComment
  = useCallback((comment: Omit<Comment, 'id'>) => {
    setCommentsForSelectedPost(prevValue => [
      ...prevValue,
      { ...comment, id: prevValue.length + 1 },
    ]);
  }, [commentsForSelectedPost]);
  const removeSelectedPostComment
  = useCallback((id: number) => {
    setCommentsForSelectedPost(
      prevValue => prevValue.filter(comment => comment.id !== id),
    );
  }, [commentsForSelectedPost]);

  const removeCommentBtnClickHandler = useCallback(async (id: number) => {
    setSomeCommentIsDeleting(true);
    await removePostCommetById(id);
    removeSelectedPostComment(id);
    setSomeCommentIsDeleting(false);
  }, [removeSelectedPostComment]);

  const getPostDetails = useCallback(async () => {
    try {
      setSelectedPostDetails(null);
      const [post, comments] = await Promise.all([
        getPostDetailsById(selectedPostId),
        getPostCommentsById(selectedPostId),
      ]);

      setSelectedPostDetails(post);
      setCommentsForSelectedPost(comments);
    } catch (e) {
      console.log(`can't load data from serever: ${e}`);
    }
  }, [selectedPostId]);

  useEffect(() => {
    getPostDetails();
  }, [selectedPostId]);

  return (
    <>
      {selectedPostDetails && (
        <div className="PostDetails">
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{selectedPostDetails?.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setCommentsIsShowing((prevValue) => !prevValue);
              }}
            >
              {`${commentsIsShowing ? 'Hide' : 'Show'} ${commentsForSelectedPost.length} comments`}
            </button>

            {(commentsIsShowing && commentsForSelectedPost.length > 0) && (
              <ul className="PostDetails__list">
                {commentsForSelectedPost.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeCommentBtnClickHandler(comment.id);
                      }}
                    >
                      {someCommentIsDeleting ? <Loader /> : 'X'}
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
                selectedPostId={selectedPostId}
                addSelectedPostComment={addSelectedPostComment}
              />
            </div>
          </section>
        </div>
      )}
      {!selectedPostDetails && (
        <Loader />
      )}
    </>
  );
});
