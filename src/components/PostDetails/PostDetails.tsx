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
                      onClick={async () => {
                        setSomeCommentIsDeleting(true);
                        await removePostCommetById(comment.id);
                        setSomeCommentIsDeleting(false);
                        getPostDetails();
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
                getPostDetails={getPostDetails}
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
