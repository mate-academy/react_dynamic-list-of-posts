import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getComments, deleteComment } from '../../api/comments';
import { getPostById } from '../../api/post';

type Props = {
  postId: number,
};

const initialPost = {
  id: 0,
  title: '',
  userId: 0,
  body: '',
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [post, setPost] = useState<Post>(initialPost);

  useEffect(() => {
    getPostById(postId).then(loadedPost => setPost(loadedPost));
    getComments(post.id).then(foundComments => setComments(foundComments));
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          onClick={() => setIsHidden(!isHidden)}
          type="button"
          className="button"
        >
          {`Hide ${comments.length} comments`}
        </button>
        {isHidden && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  onClick={() => deleteComment(comment.id)}
                  type="button"
                  className="PostDetails__remove-button button"
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
          <NewCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
};
