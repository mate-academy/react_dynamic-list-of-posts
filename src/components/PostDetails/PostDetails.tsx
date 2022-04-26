import { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { PostDetailsUI } from '../PostDetailsUI';
import { NewCommentForm } from '../NewCommentForm';
import { getSelectedPost } from '../../api/posts';
import { getPostComments, postComment, deletePostComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<PostComment[]>([]);
  const [isCommentsShow, setIsCommentsShow] = useState(true);
  const [isDetLoading, setIsDetLoading] = useState(false);
  const [isComLoading, setIsComLoading] = useState(false);

  async function loadPostDetails() {
    setIsDetLoading(true);

    const postFromServer = await getSelectedPost(selectedPostId);

    setSelectedPost(postFromServer);

    setIsDetLoading(false);
  }

  async function loadComments() {
    setIsComLoading(true);
    const commentsFromServer = await getPostComments(selectedPostId);

    setPostComments(commentsFromServer);
    setIsComLoading(false);
  }

  const postNewComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    if (selectedPost) {
      setIsComLoading(true);
      await postComment({
        postId: selectedPost.id,
        name,
        email,
        body,
      });
    }

    await loadComments();
    setIsComLoading(false);
  };

  const deleteComment = async (commentId: number) => {
    setIsComLoading(true);
    await deletePostComment(commentId);

    await loadComments();
    setIsComLoading(false);
  };

  const changeShowComments = () => {
    setIsCommentsShow(current => !current);
  };

  useEffect(() => {
    loadPostDetails();
    loadComments();
  }, [selectedPostId]);

  if (!isDetLoading && selectedPost) {
    return (
      <div className="PostDetails">
        <h2>Post details:</h2>
        <PostDetailsUI
          selectedPost={selectedPost}
          postComments={postComments}
          onDeleteComment={deleteComment}
          isCommentsShow={isCommentsShow}
          onchangeShowComments={changeShowComments}
          isComLoading={isComLoading}
        />
        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm onPostNewComment={postNewComment} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <Loader />
  );
};
