import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const createdAt = new Date(user.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Navbar user={user} currentPath="/profile" />
      <main className="max-w-[520px] mx-auto px-5 py-10">
        <h2 className="text-xl font-semibold text-text-h mb-5">프로필</h2>
        <div className="bg-bg-card rounded-lg p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text font-medium">이메일</span>
            <span className="text-text-h">{user.email}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text font-medium">가입일</span>
            <span className="text-text-h">{createdAt}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text font-medium">ID</span>
            <span className="font-mono text-xs text-text">{user.id}</span>
          </div>
        </div>
      </main>
    </>
  )
}
