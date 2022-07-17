import React, { memo, useEffect, useState } from 'react';
import {
  createComment,
  getPostComments,
  removeComment,
} from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface PostDetailsProps {
  selectedPostId: number;
}

export const PostDetails: React.FC<PostDetailsProps> = memo(({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const loadPostDetails = async () => {
    const receivedPostDetails = await getPostDetails(selectedPostId);

    setPostDetails(receivedPostDetails);
  };

  const loadComments = async () => {
    setComments(await getPostComments(selectedPostId));
  };

  const deleteComment = (commentId: number) => {
    if (comments) {
      setComments(comments.filter((comment: CommentType) => (
        comment.id !== commentId)));

      removeComment(commentId);
    }
  };

  const addComment = (
    name: string,
    email: string,
    body: string,
  ) => {
    let newCommentId: number;

    if (comments) {
      const commentsIds = comments.map((postComment: CommentType) => (
        postComment.id
      ));

      newCommentId = (Math.max(...commentsIds)) + 1;
    } else {
      newCommentId = 1;
    }

    const newComment = {
      id: newCommentId,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      postId: selectedPostId,
      name,
      email,
      body,
    };

    createComment(newComment);

    setComments([...comments, newComment]);
  };

  useEffect(
    () => {
      loadPostDetails();
      loadComments();
    }, [selectedPostId],
  );

  return (
    <div className="PostDetails">
      <h2>{`Post details: #${postDetails?.id}`}</h2>

      <section className="PostDetails__post">
        <p>{`${postDetails?.body}`}</p>
      </section>

      <section className="PostDetails__comments">
        {
          comments && isCommentsVisible
            ? (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setIsCommentsVisible(!isCommentsVisible);
                  setComments([]);
                }}
              >
                Hide comments
              </button>
            )
            : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setIsCommentsVisible(!isCommentsVisible);
                  loadComments();
                }}
              >
                Show comments
              </button>
            )
        }

        <ul className="PostDetails__list">
          {
            comments && (
              comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))
            )
          }
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAddComment={addComment} />
        </div>
      </section>
    </div>
  );
});
