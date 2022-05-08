import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetail } from '../../api/posts';
import {
  getPostComments,
  deleteComment,
  createComment,
} from '../../api/comments';
import { Post } from '../../types/post';
import { Comment } from '../../types/comment';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState(false);

  useEffect(() => {
    getPostDetail(selectedPostId)
      .then(response => {
        return setPostDetail(response);
      });
  }, [selectedPostId]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(response => {
        return setComments(response);
      });
  }, [selectedPostId]);

  const getDeleteComment = (commentId:number) => {
    deleteComment(commentId);
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const addComment = (newComment: Comment) => {
    setComments(currentCom => [...currentCom, newComment]);
    createComment(newComment);
  };

  const getVisibleComments = () => {
    setVisibleComments((prevState) => !prevState);
  };

  const toggleBtnComments = () => {
    if (comments.length === 0) {
      return 'No comments yet';
    }

    if (!visibleComments && comments.length > 0) {
      return `Show ${comments.length} comments`;
    }

    return `Hide ${comments.length} comments`;
  };

  return (
    <div className="PostDetails">
      {selectedPostId
        ? (
          <>
            <h2>
              Post details:
              {postDetail?.userId}
            </h2>

            <section className="PostDetails__post">
              <p>{postDetail?.title}</p>
            </section>

            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={getVisibleComments}
              >
                {toggleBtnComments()}
              </button>

              {visibleComments
                && (
                  <ul className="PostDetails__list">
                    {comments.map(comment => (
                      <li
                        className="PostDetails__list-item"
                        key={comment.id}
                      >
                        <button
                          type="button"
                          className="PostDetails__remove-button button"
                          onClick={() => getDeleteComment(comment.id)}
                        >
                          X
                        </button>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                ) }
            </section>
            <section>
              <div className="PostDetails__form-wrapper">
                <NewCommentForm
                  selectedPostId={selectedPostId}
                  commentsLength={comments.length}
                  addComment={addComment}
                />
              </div>
            </section>
          </>
        )
        : 'No posts details yet' }
    </div>
  );
};
