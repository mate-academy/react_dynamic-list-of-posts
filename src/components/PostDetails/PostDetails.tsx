import React, { useEffect, useState } from 'react';
import { getPostComments, removePostComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [commentsHidden, setCommentsHidden] = useState(true);
  const [postDetailsLoaded, setPostDetailsLoaded] = useState(false);

  const loadComments = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
  };

  const loadPostDetails = async () => {
    setPostDetailsLoaded(false);
    const postsFromServer = await getPostDetails(selectedPostId);

    setPostDetailsLoaded(true);
    setPostDetails(postsFromServer);
  };

  useEffect(() => {
    if (selectedPostId) {
      loadPostDetails();
      loadComments();
    }
  }, [selectedPostId]);

  const removeComment = async (commentId: number) => {
    await removePostComment(commentId);

    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails && postDetailsLoaded
        ? (
          <section className="PostDetails__post">
            <p>{postDetails.body}</p>
          </section>
        )
        : <Loader />}

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsHidden(!commentsHidden)}
        >
          {`${commentsHidden ? 'Show' : 'Hide'} ${postComments.length} comments`}
        </button>

        {!commentsHidden
          && (
            <ul className="PostDetails__list">
              {postComments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{`[${comment.name}]: ${comment.body}`}</p>
                </li>
              ))}
            </ul>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
