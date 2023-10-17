import { AuthButtonServer } from '@/components/AuthButtonServer'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import PostCard from '@/components/PostCard'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, user_name, avatar_url)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
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
    </main>
  )
}
