import { error, type Handle } from '@sveltejs/kit'
import { getUtenteByToken } from '$lib/server'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const access = event.cookies.get('access')

  if (event.url.pathname.startsWith('/privato')) {

    if (!access) {
      throw error(401);
    }
    else{
      // find the user based on the session cookie
      const utente = getUtenteByToken(access);
      if (!utente){
        throw error(401);
      }
    }
  }

  // load page as normal
  return await resolve(event)
}