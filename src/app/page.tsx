import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import TodoView from '@/components/TodoView'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })

  const todos = (data ?? []).map((row) => ({
    id: row.id,
    text: row.text,
    done: row.done,
    createdAt: new Date(row.created_at).getTime(),
  }))

  return (
    <>
      <Navbar user={user} currentPath="/" />
      <main className="max-w-[520px] mx-auto px-5 py-10">
        <TodoView initialTodos={todos} />
      </main>
    </>
  )
}
