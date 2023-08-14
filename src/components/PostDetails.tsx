import React, { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { ErrMessage } from '../types/ErrMessage';
import { CommentsList } from './CommentsList';
import { addComment, deleteComment, getComments } from '../api';

type Props = {
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMess, setErrorMess] = useState<ErrMessage>(ErrMessage.Empty);
  const [isShowingForm, setIsShowingForm] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formText, setFormText] = useState<string>('');
  const [
    isLoadingAddComment, setIsLoadingAddComment,
  ] = useState<boolean>(false);

  const { id, title, body } = selectedPost;

  const handlerOpeningForm = () => {
    setIsShowingForm(true);
    setErrorMess(ErrMessage.Empty);
  };

  const addComments = (
    newName: string,
    newEmail: string,
    newText: string,
  ) => {
    const newComment = {
      id: Math.max(...comments.map(c => c.id)) + 1,
      postId: id,
      name: newName,
      email: newEmail,
      body: newText,
    };

    setIsLoadingAddComment(true);

    addComment(newComment)
      .then(comment => {
        setComments(currentComs => {
          if (currentComs !== null) {
            return [...currentComs, comment];
          }

          return [comment];
        });
        setFormText('');
      })
      .catch(() => {
        setErrorMess(ErrMessage.AddComment);
      })
      .finally(() => {
        setIsLoadingAddComment(false);
      });
  };

  const deleteComments = (commentId: number) => {
    setComments(currentComments => currentComments.filter(comment => {
      return comment.id !== commentId;
    }));
    setErrorMess(ErrMessage.Empty);

    deleteComment(commentId)
      .catch(() => {
        setComments(comments);
        setErrorMess(ErrMessage.DeleteComment);
      });
  };

  useEffect(() => {
    setIsShowingForm(false);
    setErrorMess(ErrMessage.Empty);
    setFormName('');
    setFormEmail('');
    setFormText('');

    if (selectedPost) {
      setIsLoadingComments(true);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setErrorMess(ErrMessage.GetComments))
        .finally(() => setIsLoadingComments(false));
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        {isLoadingComments ? (<Loader />) : (
          <>
            <div className="block">
              {errorMess.length > 1 && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMess}
                </div>
              )}

              {comments.length < 1 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && (
                <CommentsList
                  comments={comments}
                  deleteComments={deleteComments}
                />
              )}

              {isShowingForm ? (
                <NewCommentForm
                  name={formName}
                  onSetFormName={setFormName}
                  email={formEmail}
                  onSetFormEmail={setFormEmail}
                  commentText={formText}
                  onSetCommentText={setFormText}
                  addComments={addComments}
                  isLoadingNewComment={isLoadingAddComment}
                  onSetErrorInPostDetails={setErrorMess}
                />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handlerOpeningForm}
                >
                  Write a comment
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
