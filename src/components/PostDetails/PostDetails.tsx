import React, { useState } from 'react';
import {
  addComments,
  deleteComments,
  getComments,
  getPostComments,
} from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { validation } from '../../utils/validation';
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
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsloadingComments] = useState<boolean>(false);
  const [isLoadingForm, setIsloadingForm] = useState<boolean>(false);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostName(event.target.value);
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostEmail(event.target.value);
  };

  const changeBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(event.target.value);
  };

  const loadComments = async (postId: number) => {
    const loadPostComments = await getPostComments(postId);

    setIsloadingComments(false);
    setPostComments(loadPostComments);
  };

  const showOrHideComments = () => {
    setIsloadingComments(true);
    if (isCommentVisible) {
      setIsCommentVisible(false);
    } else {
      setIsCommentVisible(true);
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
    if (!validation(postName, postEmail, postBody)) {
      return null;
    }

    setIsloadingComments(true);
    setIsloadingForm(true);

    if (selectedPostId) {
      const comment = {
        name: postName,
        email: postEmail,
        body: postBody,
        id: +uniqueId,
        postId: selectedPostId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const addCom
      = await addComments(comment);

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
    const deleteComment = await deleteComments(comment.id);

    loadComments(comment.postId);

    return deleteComment;
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
          {isCommentVisible ? 'Hide comments' : 'Show comments'}
        </button>

        {isCommentVisible && (
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
