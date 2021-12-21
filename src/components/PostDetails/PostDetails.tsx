import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  getPostDetails,
  getPostComments,
  addComment,
  deleteComment,
} from '../../api/api';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type CommentInfo = Omit<Comment, 'id'>;

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, selectPost] = useState<Post>();
  const [postComments, setComments] = useState<Comment[]>();
  const [isCommentsHidden, hideComments] = useState<boolean>(false);

  const getPost = async () => {
    try {
      const [post, comments] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      if (post) {
        selectPost(post);
      }

      if (comments) {
        setComments(comments);
      }
    } catch {
      throw new Error('Data was\'t found');
    }
  };

  const addPostComment = (comment: CommentInfo) => {
    addComment(comment);
    getPost();
  };

  const deletePostComment = (commentId: number) => {
    deleteComment(commentId);
    getPost();
  };

  useEffect(() => {
    getPost();
  }, [selectedPostId, postComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPost && (
        <>
          <section className="PostDetails__post">
            <p>{selectedPost.title}</p>
          </section>

          {postComments && postComments.length > 0 && (
            <section className="PostDetails__comments">
              <button
                type="button"
                className="button"
                onClick={() => hideComments(!isCommentsHidden)}
              >
                {
                  isCommentsHidden
                    ? `Show ${postComments.length} comments`
                    : `Hide ${postComments.length} comments`
                }
              </button>

              <ul className="PostDetails__list">
                {!isCommentsHidden && (
                  postComments.map((comment) => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                        onClick={() => deletePostComment(comment.id)}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))
                )}
              </ul>
            </section>
          )}

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={selectedPostId}
                addPostComment={addPostComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
