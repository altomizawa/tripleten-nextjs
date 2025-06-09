import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache } from 'react'
import { redirect } from 'next/navigation'

export const verifySession = cache(async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const session = await decrypt(cookie)
  if (!session?.userId) {
    console.log('no session')
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})