import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createAllergene, getAllergene, updateAllergene } from '$lib/server';

export const load = ( ({url}) => {
    let allergeneId = url.searchParams.get('allergeneId')
    return { allergeneId };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        let allergeneIdS = data.get('allergeneId')?.toString();
        let allergeneNome = data.get('allergeneNome')?.toString();
        
        //server-side validation
        if (!allergeneIdS) {
            return fail(400, { missingId: true });  //in realtà se non viene inserito è autoincrementale
        }
        if (!allergeneNome) {
            return fail(400, { missingName: true });
        }

        let allergeneId= parseInt(allergeneIdS);
        if(isNaN(allergeneId)){
            return fail(400, { allergeneIdS, incorrectId: true });
        }

        
        let allergene = getAllergene(allergeneId);
        //se esiste aggiorno il nome, senno' lo creo
        if(allergene){
           if(!updateAllergene(allergeneId, allergeneNome)){
            return {success: false, id: 1};
           }
           else{
            redirect(301, "/privato/gestioneAllergeni/");
           }
        }
        else{
            if(createAllergene(allergeneId, allergeneNome)){
                redirect(301, "/privato/gestioneAllergeni/");
            }
            else{
                return {success: false, id: 0};
            }
        }
        
    }
} ;