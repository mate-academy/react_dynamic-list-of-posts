import React, { useEffect, useState } from 'react';
import { getCommentsOfPost, deleteComment } from '../../api/comments';
import { getSelectedPost } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: 0,
    userId: 0,
    title: '',
    body: '',
  });

  const [commentsOfPost, setComments] = useState<Comment[]>([{
    id: 0,
    postId: 0,
    name: '',
    email: '',
    body: '',
  }]);

  const [isCommentsHidden, setIsCommentsHidden] = useState(false);

  const changeSelectedPost = async () => {
    const changedSelectedPost = await getSelectedPost(selectedPostId);

    setSelectedPost(changedSelectedPost);
  };

  const getPostComments = async () => {
    const comments = await getCommentsOfPost(selectedPostId);

    setComments(comments);
  };

  const removeComment = async (id: number) => {
    await deleteComment(id);

    await getPostComments();
  };

  useEffect(() => {
    getPostComments();
    changeSelectedPost();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        {commentsOfPost.length
          && (
            <button
              type="button"
              className="button"
              onClick={() => setIsCommentsHidden(!isCommentsHidden)}
            >
              {!isCommentsHidden ? `Hide ${commentsOfPost.length} comments` : 'Show comments'}
            </button>
          )}

        {!isCommentsHidden && (
          <ul className="PostDetails__list">
            {commentsOfPost.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(comment.id);
                  }}
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
            getPostComments={getPostComments}
            postId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
