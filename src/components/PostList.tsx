import PostCard from '@/components/PostCard'
import { type Post } from '@/types/posts'

export default function PostList({ posts }: { posts: Post[] | null }) {
  return (
    <>
      {posts?.map((post) => {
        const { id, user, content } = post
        return (
          <PostCard
            key={id}
            userFullName={user.name}
            userName={user.user_name}
            avatarUrl={user.avatar_url}
            content={content}
          />
        )
      })}
    </>
  )
}
