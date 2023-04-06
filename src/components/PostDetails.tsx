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
  const [isLoaderPost, setIsLoaderPost] = useState(false);

  useEffect(() => {
    setIsLoaderPost(true);
    getComments(postSelectedId)
      .then(comments => {
        setPostComments(comments);
        setIsLoaderPost(false);
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
      {showSideBar && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>
            ≠
            <p data-cy="PostBody">
              {selectedPost?.body}
            </p>
          </div>
          <div className="block">
            {isLoaderPost ? <Loader /> : (
              <CommentList
                postComments={postComments}
                deleteComment={deleteComment}
              />
            )}

            {!isShowForm && !isLoaderPost && (
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
          {isShowForm
            && (
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
