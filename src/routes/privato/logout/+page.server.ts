import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  // we only use this endpoint for the api
  // and don't need to see the page
  redirect(302, '/')
}

export const actions: Actions = {
 
   default({ cookies }) {
    // invalido il cookie di sessione
    cookies.set('access', '', {
      path: '/',
      expires: new Date(0),
    })

    // redirect the user
    redirect(302, '/');
  }, 
}
