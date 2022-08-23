import React, { useState } from 'react';
import {
  addComments,
  deleteComments,
  getComments,
  getPostComments,
} from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectPostDetails: Post | null;
  selectedPostId: number | null;
};

export const PostDetails: React.FC<Props> = (
  {
    selectPostDetails,
    selectedPostId,
  },
) => {
  const [postName, setPostName] = useState<string>('');
  const [postEmail, setPostEmail] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsloadingComments] = useState<boolean>(false);
  const [isLoadingForm, setIsloadingForm] = useState<boolean>(false);

  const changeName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(value.target.value);
  };

  const changeEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPostEmail(value.target.value);
  };

  const changeBody = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(value.target.value);
  };

  const loadComments = async (postId: number) => {
    const loadPostComments = await getPostComments(postId);

    setIsloadingComments(false);
    setPostComments(loadPostComments);
  };

  const showOrHideComments = async () => {
    setIsloadingComments(true);
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }

    if (selectedPostId) {
      loadComments(selectedPostId);
    }
  };

  const uniqueId = async () => {
    const numbers: Comment[] = await getComments();

    return numbers[numbers.length - 1].id + 1;
  };

  const addComment = async () => {
    const emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';

    if (!postName
      || !postEmail || !postEmail.match(emailPattern) || !postBody) {
      return null;
    }

    setIsloadingComments(true);
    setIsloadingForm(true);

    if (selectedPostId) {
      const addCom
      = await addComments(
        postName,
        postEmail,
        postBody,
        uniqueId,
        selectedPostId,
      );

      loadComments(selectedPostId);
      setPostName('');
      setPostEmail('');
      setPostBody('');
      setIsloadingForm(false);

      return addCom;
    }

    return null;
  };

  const removeComment = async (comment: Comment) => {
    setIsloadingComments(true);
    const remComment = await deleteComments(comment.id);

    loadComments(comment.postId);

    return remComment;
  };

  if (!selectPostDetails) {
    return null;
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectPostDetails.body}</p>
      </section>

      <section className="PostDetails__comments" data-cy="postList">
        <button
          type="button"
          className="button"
          onClick={showOrHideComments}
        >
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>

        {showComments && (
          isLoadingComments ? <Loader /> : (
            <ul className="PostDetails__list">
              {postComments.length > 0
                ? (postComments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeComment(comment)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                )))
                : 'No comments yet'}
            </ul>
          )
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          {isLoadingForm
            ? <Loader />
            : (
              <NewCommentForm
                addComment={addComment}
                name={postName}
                email={postEmail}
                body={postBody}
                changeName={changeName}
                changeEmail={changeEmail}
                changeBody={changeBody}
              />
            )}
        </div>
      </section>
    </div>
  );
};
