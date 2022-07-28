/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  getPostComments,
  getPostDetails,
} from '../../api/api';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsShown, setIsCommentsShown] = useState<boolean>(true);

  const loadPost = () => {
    getPostDetails(selectedPostId).then(postFromServer => {
      if (!('Error' in postFromServer)) {
        setPost(postFromServer);
      }
    });
  };

  const loadComments = () => {
    getPostComments(selectedPostId).then(commentsFromServer => {
      if (!('Error' in commentsFromServer)) {
        setComments(commentsFromServer);
      }
    });
  };

  useEffect(() => {
    loadPost();
    loadComments();
    setIsCommentsShown(true);
  }, [selectedPostId]);

  const handleDeleteComment = async (id?: number) => {
    if (id) {
      await deleteComment(id);
      loadComments();
    }
  };

  const handleAddComment = async (name: string, email: string, body: string) => {
    const newComment: Comment = {
      postId: selectedPostId,
      name,
      email,
      body,
    };

    await addComment(newComment);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => (isCommentsShown ? setIsCommentsShown(false) : setIsCommentsShown(true))}
          >
            {isCommentsShown
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`}
          </button>
        )}

        <ul className="PostDetails__list" data-cy="postList">
          {isCommentsShown
              && comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm onAddComment={handleAddComment} />
        </div>
      </section>
    </div>
  );
};
