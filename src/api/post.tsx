import { Post } from "../types/Post";
import { client } from "../utils/fetchClient"

export const getPost = () => {
  return client.get<Post[]>('/posts');
}