import { createAllergene, deleteAllergene, getAllergene, getAllergeni, updateAllergene } from '$lib/server';
import { fail, type Action } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */

export const load = (() => { 

    const allergeni =getAllergeni();
    return { allergeni
    };
});

export const actions = {
    delete: async ({request}) => {
        const data = await request.formData();
        let allergeneIdS = data.get('allergeneId')?.toString();
        
        //server-side validation
        if (!allergeneIdS) {
            return fail(400, { allergeneIdS, missingId: true });  
        }

        let allergeneId= parseInt(allergeneIdS);
        if(isNaN(allergeneId)){
            return fail(400, { allergeneIdS, incorrectId: true });
        }

        if(deleteAllergene(allergeneId)){
            return {success: true, id: 2};
        }
        else{
            return {success: false, id: 2};
        }
    }
} ;


