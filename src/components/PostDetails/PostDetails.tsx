import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import './PostDetails.scss';
import {
  getPostComments,
  getPostDetails,
  deletePostComment,
  addPostComment,
} from '../../api/posts';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>({} as Post);
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [commentsVisibility, setCommentsVisibility] = useState(true);
  const [isPostDetailsLoaderVisible, setIsPostDetailsLoaderVisible] = useState(true);
  const [isDeleteCommentLoaderVisible, setIsDeleteCommentLoaderVisible] = useState(true);
  const [isAddCommentLoaderVisible, setIsAddCommentLoaderVisible] = useState(true);

  const loadPostDetails = async () => {
    const postDetailsFromServer = await getPostDetails(selectedPostId);

    setPostDetails(postDetailsFromServer);
    setIsPostDetailsLoaderVisible(false);
  };

  const loadPostComments = async () => {
    const postCommentsFromServer = await getPostComments(selectedPostId);

    setPostComments(postCommentsFromServer);
    setIsPostDetailsLoaderVisible(false);
    setIsDeleteCommentLoaderVisible(false);
    setIsAddCommentLoaderVisible(false);
  };

  useEffect(() => {
    setIsPostDetailsLoaderVisible(true);
    loadPostDetails();
    loadPostComments();
  }, [selectedPostId]);

  const deleteComment = async (commentId?: number) => {
    setIsDeleteCommentLoaderVisible(true);
    if (commentId) {
      await deletePostComment(commentId);
      await loadPostComments();
    }
  };

  const addComment = async (name: string, email: string, body: string) => {
    setIsAddCommentLoaderVisible(true);
    const newComment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    await addPostComment(newComment);
    await loadPostComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {isPostDetailsLoaderVisible ? (<Loader />) : (
        <>
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>

          <section className="PostDetails__comments">
            {!!postComments.length && (
              <button
                type="button"
                className="button"
                onClick={() => setCommentsVisibility(current => !current)}
              >
                {commentsVisibility ? (
                  `Hide ${postComments.length} comments`
                ) : (
                  `Show ${postComments.length} comments`
                )}
              </button>
            )}

            {commentsVisibility && (
              <ul className="PostDetails__list">
                {postComments.map(postComment => (
                  <li className="PostDetails__list-item" key={postComment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(postComment.id)}
                    >
                      X
                    </button>
                    <p>{postComment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {isDeleteCommentLoaderVisible && (<Loader />)}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm onAddComment={addComment} />
            </div>
            {isAddCommentLoaderVisible && <Loader />}
          </section>
        </>
      )}
    </div>
  );
};
