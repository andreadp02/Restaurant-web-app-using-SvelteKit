import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUtente, updateAuthToken } from '$lib/server';
import bcrypt from 'bcrypt';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        let email = data.get("email")?.toString();
        let password = data.get("password")?.toString();

        //server-side validation
        if (!email || !password) {
            return fail(400, { email: email, incorrect: true });
        }

        let utente = getUtente(email);
        //verifico se esiste l'account
        if (!utente) {
            return fail(400, { email: email, incorrect: true });
        }


        //confronto con la password del db
        const correctPassword = await bcrypt.compare(password, utente.password);
        if (!correctPassword) {
            return fail(400, { email: email, incorrect: true });
        }

        let token = crypto.randomUUID();
        if (!updateAuthToken(email, token)) {
            return fail(400, { email: email, incorrect: true });
        }

        cookies.set("access", token, { path: "/", sameSite: "strict" });
        throw redirect(302, "/privato");


    }
}