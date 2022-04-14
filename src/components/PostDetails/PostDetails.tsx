import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { BASE_URL } from '../../api/api';

type Props = {
  postId: number,
  onCommentsSet: Dispatch<SetStateAction<Comment[]>>,
  comments: Comment[],
};

export const PostDetails: React.FC<Props> = ({
  postId,
  onCommentsSet,
  comments,
}) => {
  const [isComment, setIsComment] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    const posts = await getPostDetails(postId);

    setPost(posts);
  };

  const fetchComments = async () => {
    const commentsArr = await getPostComments(postId);

    onCommentsSet(commentsArr);
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, [postId]);

  const removeComment = async (commentId: number) => {
    const response = await fetch(`${BASE_URL}/comments/${commentId}`,
      { method: 'DELETE' });

    const data = await response.json();

    return data;
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      {isComment ? (
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsComment(prev => !prev);
          }}
        >
          Hide
          {' '}
          {comments.length}
          {' '}
          {comments.length > 1 ? 'comments' : 'comment'}
        </button>
      ) : (
        <button
          type="button"
          className="button"
          onClick={() => setIsComment(prev => !prev)}
        >
          Show
          {' '}
          {comments.length}
          {' '}
          {comments.length > 1 ? 'comments' : 'comment'}
        </button>
      )}

      {isComment && (
        <section className="PostDetails__comments">

          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => removeComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
          />
        </div>
      </section>
    </div>
  );
};
