import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, deletePostComments } from '../../api/coments';
import { getPostDetails } from '../../api/posts';
import './PostDetails.scss';

interface Props {
  selectPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectPostId }) => {
  const [commentsOfPost, setCommentsOfPost] = useState<Comment[]>([]);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [visibleComments, setVisibleComments] = useState<boolean>(true);

  const loadComentsByPostId = async (postId: number) => {
    const gotComments = await getPostComments(postId);

    setCommentsOfPost(gotComments);
  };

  const loadPostDetails = async (postId: number) => {
    const gotPostDetails = await getPostDetails(postId);

    setPostDetails(gotPostDetails);
  };

  const refreshCommentsData = async () => {
    const freshComents = await getPostComments(selectPostId);

    setCommentsOfPost(freshComents);
  };

  const handleDeleteComments = async (commentId: number) => {
    await deletePostComments(commentId);
    refreshCommentsData();
  };

  useEffect(() => {
    loadComentsByPostId(selectPostId);
    loadPostDetails(selectPostId);
  }, [selectPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">

        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">

        {visibleComments ? (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibleComments(false);
            }}
          >
            Hide comments
          </button>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => {
              setVisibleComments(true);
            }}
          >
            Show comments
          </button>
        )}

        {visibleComments && commentsOfPost?.map(postComment => (
          <ul
            key={postComment.id}
            className="PostDetails__list"
          >
            <li className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  handleDeleteComments(postComment.id);
                }}
              >
                X
              </button>
              <p>{postComment.body}</p>
            </li>
          </ul>

        ))}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectPostId={selectPostId}
            refreshCommentsData={refreshCommentsData}
          />
        </div>
      </section>
    </div>
  );
};
