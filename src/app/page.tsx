import { AuthButtonServer } from '@/components/AuthButtonServer'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import PostList from '@/components/PostList'
import { type Database } from '@/types/database'
import { ComposePost } from '@/components/ComposePost'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[600px] w-full mx-auto border-r border-l border-white/20 min-h-screen">
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostList posts={posts} />
      </section>
      <AuthButtonServer />
    </main>
  )
}
