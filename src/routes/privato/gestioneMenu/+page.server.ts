import { getCategorie, getPiattiEAllergeni, getPiatto, setPiattoDisponibile, setPiattoNonDisponibile } from "$lib/server/";
import { fail } from "@sveltejs/kit";

export const load = (() => { 

  let categorie = getCategorie();  
  let results = getPiattiEAllergeni();
  const piattiMap = new Map<number, { id: number; nome: string; descr: string; prezzo: number; categoria: number; disponibile: number; allergeni: { id: number; nome: string }[] }>();

  for (let row of results) {
    if (!piattiMap.has(row.piatto_id)) {
        piattiMap.set(row.piatto_id, {
            id: row.piatto_id,
            nome: row.piatto_nome,
            descr: row.piatto_descr,
            prezzo: row.piatto_prezzo,
            categoria: row.piatto_categoria,
            disponibile: row.piatto_disponibile,
            allergeni: []
        });
    }
    
   if (row.allergene_id !== null) {
        piattiMap.get(row.piatto_id)!.allergeni.push({
            id: row.allergene_id,
            nome: row.allergene_nome!
        });
    }
        
}

let piatti = Array.from(piattiMap.values());
    return { piatti, categorie
    }
} ) ;

export const actions = {
    cambiaDisponibilita: async ({request}) => {
        const data = await request.formData();
        let piattoIdS = data.get('piattoId')?.toString();
        //server-side validation
        if (!piattoIdS) {
            return fail(400, { piattoIdS: piattoIdS, missingId: true });  
        }

        let piattoId= parseInt(piattoIdS);
        if(isNaN(piattoId)){
            return fail(400, { allergeneIdS: piattoIdS, incorrectId: true });
        }

        let piatto = getPiatto(piattoId);
        //verifico se esiste il piatto
        if(piatto){
            //cambio disponibilità
            if(piatto.disponibile){
                if(setPiattoNonDisponibile(piattoId)){
                    return {success: true};
                }
                else{
                    return {success: false};
                }
            }
            else{
                if(setPiattoDisponibile(piattoId)){
                    return {success: true};
                }
                else{
                    return {success: false};
                }
            }
        }
        
    }
} ;