import React, { useCallback, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Comment, Post } from '../../react-app-env';
import {
  getPostComments,
  getPostDetails,
  deleteComment,
} from '../../api/posts';
import { Loader } from '../Loader';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = React.memo(
  ({
    selectedPostId,
  }) => {
    const [showComments, setShowComments] = useState(true);
    const [postDetails, setPostDetails] = useState<Post>();
    const [postDetailsLoaded, setPostDetailsLoaded] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isCommentAdded, setIsCommentAdded] = useState(false);

    const loadPostDetails = useCallback(
      async () => {
        setPostDetailsLoaded(false);

        const loadedPostDetails = await getPostDetails(selectedPostId);

        setPostDetailsLoaded(true);

        setPostDetails(loadedPostDetails);
      },
      [selectedPostId],
    );

    const loadComments = useCallback(
      async () => {
        const loadedComments = await getPostComments(selectedPostId);

        setComments(loadedComments);
      },
      [selectedPostId],
    );

    useEffect(() => {
      loadPostDetails();
      loadComments();
    }, [selectedPostId, isCommentAdded]);

    return (
      <div className="PostDetails">
        <h2>{`Post details: ${postDetails?.id}`}</h2>

        {postDetailsLoaded
          ? (
            <section className="PostDetails__post">
              <p>{postDetails?.body}</p>
            </section>
          )
          : (
            <Loader />
          )}

        <section className="PostDetails__comments" data-cy="postDetails">
          {showComments
            ? (
              <button
                type="button"
                className="button"
                onClick={() => setShowComments(false)}
              >
                Hide comments
              </button>
            )
            : (
              <button
                type="button"
                className="button"
                onClick={() => setShowComments(true)}
              >
                Show comments
              </button>
            )}

          {showComments && (
            <ul className="PostDetails__list">
              {comments.map((comment: Comment) => (
                <li className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id)
                        .then(() => {
                          setComments(comments.filter(item => (
                            item.id !== comment.id
                          )));
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

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              selectedPostId={selectedPostId}
              onAddComment={setIsCommentAdded}
            />
          </div>
        </section>
      </div>
    );
  },
);
