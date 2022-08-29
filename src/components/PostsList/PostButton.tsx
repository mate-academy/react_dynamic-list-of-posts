import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelector"
import { Post } from "../../store/slices/postSlice/postSlice";

interface Props {
  post: Post
}

export const PostButton: React.FC<Props> = ({ post }) => {
  const { selectedPost } = useAppSelector(state => state.postSlice);
  const { selectPost } = useActions();
  const [buttonState, setButtonState] = useState('Open');

  useEffect(() => {
    post.id !== selectedPost?.id && setButtonState('Open');
  });

  const handleClick = () => {
    if (buttonState === 'Open') {
      selectPost(post);
      setButtonState('Close')
    } else {
      selectPost(null);
      setButtonState('Open')
    }
  }

  return (
    <button
      type="button"
      className="PostsList__button button"
      onClick={handleClick}
    >
      {buttonState}
    </button>
  );
};
