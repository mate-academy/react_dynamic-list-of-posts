import { Comment } from "../types/Comment"
import { Post } from "../types/Post"
import { User } from "../types/User"
import { client } from "../utils/fetchClient"


export const getPostsForUser = (userId: number) => {
return client.get<Post[]>(`/posts?userId=${userId}`)
}
export const getCommentsForPost = (postId: number) => {
return client.get<Comment[]>(`/comments?postId=${postId}`)
}
export const getUsers = () => {
return   client.get<User[]>('/users')
}