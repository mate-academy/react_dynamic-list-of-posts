import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

import { getPostComments, deleteComment } from '../../api/comments';
import { getPostById } from '../../api/posts';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const loadPostDetails = async () => {
      setIsLoadingDetails(true);

      const post = await getPostById(selectedPostId);
      const comments = await getPostComments(selectedPostId);

      setPostDetails(post);
      setPostComments(comments);
      setIsLoadingDetails(false);
    };

    loadPostDetails();
  }, [selectedPostId]);

  const buttonTitle = showComments
    ? `Show ${postComments?.length} comments`
    : `Hide ${postComments?.length} comments`;

  const removeComment = async (commentId: number) => {
    setIsLoadingComments(true);
    await deleteComment(commentId);

    const result = await getPostComments(selectedPostId);

    setPostComments(result);
    setIsLoadingComments(false);
  };

  return (isLoadingDetails
    ? (<Loader />)
    : (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{postDetails?.body}</p>
        </section>

        {postComments && (
          isLoadingComments ? (
            <Loader />
          ) : (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => setShowComments(!showComments)}
              >
                {buttonTitle}
              </button>

              {!showComments && (
                <ul className="PostDetails__list" data-cy="postDetails">
                  {postComments.map(comment => (
                    <li
                      className="PostDetails__list-item"
                      key={comment.id}
                    >
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => removeComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        )}

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              selectedPostId={selectedPostId}
              setPostComments={setPostComments}
              setIsLoadingComments={setIsLoadingComments}
            />
          </div>
        </section>
      </div>
    )
  );
};
