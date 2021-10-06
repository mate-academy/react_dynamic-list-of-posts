import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  addCommentPost, deletePostComments, getPostComments, getPostDetails,
} from '../../api/api';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isShowComments, setIsShowComments] = useState(true);

  useEffect(() => {
    (async () => {
      const getPostDetailsFromApi = await getPostDetails(selectedPostId);

      setPostDetails(getPostDetailsFromApi);
    })();
  }, [selectedPostId]);

  useEffect(() => {
    (async () => {
      const getCommentsFromApi = await getPostComments(selectedPostId);

      setPostComments(getCommentsFromApi);
    })();
  }, [selectedPostId]);

  const addComment = async (newComment: Comment) => {
    await addCommentPost(newComment);
    const updateComments = await getPostComments(selectedPostId);

    setPostComments(updateComments);
  };

  const removeComments = async (commentId: number) => {
    await deletePostComments(commentId);
    const updateComments = await getPostComments(selectedPostId);

    setPostComments(updateComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setIsShowComments(current => !current)}
        >
          {isShowComments ? 'Hide' : 'Show'}
          {' '}
          {postComments.length}
          {' '}
          comments
        </button>

        {isShowComments && (
          <ul className="PostDetails__list">
            {postComments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComments(comment.id)}
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
          <NewCommentForm
            addComment={addComment}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
