import React, { useState, useEffect, useCallback } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deletePostComment } from '../../api/comments';
import { Loader } from '../Loader';
import './PostDetails.scss';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetail, setPostDetail] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [showComment, setShowComment] = useState(true);

  useEffect(() => {
    Promise.all([
      getPostComments(selectedPostId).then(setPostComments),
      getPostDetails(selectedPostId).then(setPostDetail),
    ]);
  }, [selectedPostId, postComments.length]);

  const createComment = (newComment: Comment) => {
    setPostComments(prevState => ([
      ...prevState,
      newComment,
    ]));
  };

  const deleteComment = useCallback(async (deleteId: number) => {
    await deletePostComment(deleteId);
    const filteredComments = [...postComments].filter(
      comment => comment.id !== deleteId,
    );

    setPostComments(filteredComments);
  }, [postComments]);

  return (
    <div className="PostDetails" data-cy="postDetails">
      {!postDetail && (
        <Loader />
      )}

      {postDetail && (
        <div>
          <h2>Post details:</h2>
          <section className="PostDetails__post">
            <p>{postDetail.body}</p>
          </section>

          <section className="PostDetails__comments">
            {postComments.length > 0 && (
              <button
                type="button"
                className="button"
                onClick={
                  () => setShowComment(!showComment)
                }
              >
                {showComment
                  ? (`Hide ${postComments.length} comments`)
                  : ('Show comments')}
              </button>
            )}
            {showComment && (
              <ul className="PostDetails__list">
                {postComments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
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
              <NewCommentForm
                selectedPostId={selectedPostId}
                createComment={createComment}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
