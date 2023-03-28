import React, { useEffect, useState } from 'react';
import { getData, deleteComment, postComment } from '../api/posts';
import { Loader } from './Loader';
import { Comment, CommentData, Post } from '../types';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | null,
  isCommentLoading: boolean,
  setIsCommentLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

const initialData: CommentData = {
  name: '',
  body: '',
  email: '',
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentLoading,
  setIsCommentLoading,
}) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentData, setCommentData] = useState<CommentData>(initialData);
  const [error, setError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDataSending, setIsDataSending] = useState(false);

  useEffect(() => {
    getData<Comment>(`comments?postId=${selectedPost?.id}`)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsCommentLoading(false));
  }, [selectedPost]);

  const removeComment = (commentId: number) => {
    if (comments) {
      setComments(comments.filter(c => c.id !== commentId));
      deleteComment(commentId)
        .catch(() => setError(true));
    }
  };

  const addComment = ({ name, email, body }: CommentData) => {
    setIsDataSending(true);
    postComment(selectedPost?.id || 0, {
      postId: selectedPost?.id || 0,
      name,
      email,
      body,
    })
      .then(response => {
        setComments(prev => (
          [
            ...prev as Comment[],
            response,
          ]
        ));
      })
      .finally(() => {
        setIsDataSending(false);
        setCommentData(prev => ({
          ...prev,
          body: '',
        }));
      });
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  if (error) {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (!comments || isCommentLoading) {
    return (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost?.body}
            </p>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {!comments.length
          ? (
            <>
              <div className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </div>
              {!isFormVisible && (
                <button
                  onClick={() => setIsFormVisible(true)}
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                >
                  Write a comment
                </button>
              )}
              {isFormVisible && (
                <NewCommentForm
                  commentData={commentData}
                  setCommentData={setCommentData}
                  addComment={addComment}
                  isLoading={isDataSending}
                />
              )}
            </>
          ) : (
            <div className="block">
              <p className="title is-4">Comments:</p>

              {comments && comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  removeComment={removeComment}
                />
              ))}

              {!isFormVisible && (
                <button
                  onClick={showForm}
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                >
                  Write a comment
                </button>
              )}

              {isFormVisible && (
                <NewCommentForm
                  commentData={commentData}
                  setCommentData={setCommentData}
                  addComment={addComment}
                  isLoading={isDataSending}
                />
              )}
            </div>
          )}
      </div>
    </div>
  );
};
