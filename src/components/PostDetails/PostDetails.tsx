import React, { useState, useEffect } from 'react';

import './PostDetails.scss';

import { NewCommentForm } from '../NewCommentForm';

import { getPostDetails } from '../../api/posts';
import { getPostComments, removePostComment } from '../../api/comments';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComment[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const getPost = async () => {
    try {
      const [
        postDetailsFromServer,
        postCommentsFromServer,
      ] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      setPostDetails(postDetailsFromServer);
      setPostComments(postCommentsFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    const a = async () => {
      await getPost();
    };

    a();
  }, [selectedPostId]);

  const handleRemoveCommentButton = async (commentId: number) => {
    await removePostComment(commentId);
    await getPost();
  };

  if (postDetails === null) {
    return null;
  }

  if (isError) {
    return (
      <div className="PostDetails">
        <h1>An error occured while loading a post</h1>
      </div>
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.body}</p>
      </section>

      {postComments === null || postComments.length < 1
        ? (
          <h2>No comments</h2>
        ) : (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setIsCollapsed(state => !state);
              }}
            >
              {`${isCollapsed ? 'Show' : 'Hide'} ${postComments.length} comments`}
            </button>
            {!isCollapsed && (
              <ul className="PostDetails__list" data-cy="postDetails">
                {postComments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => handleRemoveCommentButton(comment.id)}
                    >
                      X
                    </button>

                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postDetails.id}
            reloadPost={getPost}
          />
        </div>
      </section>
    </div>
  );
};
