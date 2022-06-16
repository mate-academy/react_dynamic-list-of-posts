import React, { useCallback, useEffect, useState } from 'react';
import { getPostComments, postNewComment, removeComment } from '../../api/api';
import { ComentsPost, DetailsPost, NewPostBody } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPost: DetailsPost;
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  selectedPostId,
}) => {
  const [isShow, setIsShow] = useState(true);
  const [postComments, setPostComments] = useState<ComentsPost[] | null>(null);

  async function fetchPostComments(PostId: number) {
    const result = await getPostComments(PostId);

    setPostComments(result);
  }

  useEffect(() => {
    fetchPostComments(selectedPostId);
  }, [selectedPostId]);

  async function deleteComment(commentId: number) {
    await removeComment(commentId);
    fetchPostComments(selectedPostId);
  }

  const postComment = useCallback(async (newComment: NewPostBody) => {
    const preparedData = {
      postId: selectedPostId,
      ...newComment,
    };

    await postNewComment(preparedData);
    fetchPostComments(selectedPostId);
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>
      <section className="PostDetails__comments">
        {postComments && postComments?.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setIsShow(!isShow)}
          >
            {`${isShow ? 'Hide' : 'Show'} ${postComments?.length} comments`}
          </button>
        )}
        {isShow && (
          <ul className="PostDetails__list">
            {postComments && postComments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postComment={postComment} />
        </div>
      </section>
    </div>
  );
};
