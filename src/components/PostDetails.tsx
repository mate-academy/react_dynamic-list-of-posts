import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { NewCommentForm } from './NewCommentForm';
import { getComments, removeComment } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { CommentList } from './CommentList';
import { Post } from '../types/Post';

type Props = {
  postSelectedId: number;
  selectedPost: Post;
  isShowForm: boolean;
  setIsShowForm: Dispatch<SetStateAction<boolean>>;
  showSideBar: boolean;
};

export const PostDetails: React.FC<Props> = ({
  postSelectedId,
  selectedPost,
  isShowForm,
  setIsShowForm,
  showSideBar,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id, title, body } = selectedPost;

  useEffect(() => {
    setIsLoading(true);
    getComments(postSelectedId)
      .then(comments => {
        setPostComments(comments);
        setIsLoading(false);
      });
  }, [postSelectedId]);

  const openFormHandler = () => {
    setIsShowForm(true);
  };

  const deleteComment = (comment: Comment) => {
    if (!comment.id) {
      return;
    }

    removeComment(comment.id);

    setPostComments(prevState => (
      prevState.filter(c => c.id !== comment.id)
    ));
  };

  return (
    <>
      {showSideBar && selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${id}: ${title}`}
            </h2>
            <p data-cy="PostBody">
              {body}
            </p>
          </div>
          <div className="block">

            {isLoading ? (
              <Loader />
            ) : (
              <CommentList
                postComments={postComments}
                deleteComment={deleteComment}
              />
            )}

            {!isShowForm && !isLoading && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={openFormHandler}
              >
                Write a comment
              </button>
            )}
          </div>
          {isShowForm && (
            <NewCommentForm
              selectedPost={selectedPost}
              setPostComments={setPostComments}
              postComments={postComments}
            />
          )}
        </div>
      )}
    </>
  );
};
