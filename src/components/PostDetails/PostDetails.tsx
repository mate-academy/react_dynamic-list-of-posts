import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { Loader } from '../Loader';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [showCommentList, toggleShowCommentList] = useState(true);
  const [isCommentsLoading, toggleIsCommentsLoading] = useState(false);

  const toggleCommentsShowing = () => {
    toggleShowCommentList(!showCommentList);
  };

  const reloadComments = async () => {
    toggleIsCommentsLoading(true);
    const postCommentsFS = await getPostComments(postId);

    setPostComments(postCommentsFS);
    toggleIsCommentsLoading(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    await deletePostComment(commentId);
    reloadComments();
  };

  async function loadData() {
    const [postDetailsFS, postCommentsFS] = await Promise.all([
      getPostDetails(postId),
      getPostComments(postId),
    ]);

    setPostDetails(postDetailsFS);
    setPostComments(postCommentsFS);
  }

  useEffect(() => {
    loadData();
  }, [postId]);

  if (!postDetails) {
    return (
      <h2>Post details are loading...</h2>
    );
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length === 0
          ? (
            <h4>There are no comments</h4>
          )
          : (
            <button
              type="button"
              className="button"
              onClick={toggleCommentsShowing}
            >
              {showCommentList
                ? `Hide ${postComments.length} comments`
                : `Show ${postComments.length} comments`}
            </button>
          )}

        {showCommentList && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isCommentsLoading && <Loader />}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            reloadComments={reloadComments}
          />
        </div>
      </section>
    </div>
  );
};
