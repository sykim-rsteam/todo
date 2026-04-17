'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function addTodo(formData: FormData) {
  const text = String(formData.get('text') ?? '').trim()
  if (!text) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase.from('todos').insert({ text, user_id: user.id })
  revalidatePath('/')
}

export async function toggleTodo(id: string, done: boolean) {
  const supabase = await createClient()
  await supabase.from('todos').update({ done: !done }).eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  const supabase = await createClient()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/')
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect('/')
}

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return { error: error.message }
  if (data.user && !data.session) {
    return { message: '확인 이메일을 보냈습니다. 이메일을 확인해주세요.' }
  }

  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
