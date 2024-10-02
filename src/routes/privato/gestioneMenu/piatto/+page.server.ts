import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createAllergenePiatto, createPiatto, deleteAllergenePiatto, getAllergeni, getAllergeniPiatto, getCategorie, getLastPiattoId, getPiatto, updatePiatto, updatePiattoConImg } from '$lib/server';
import type { Categoria } from '$lib/types';
import { writeFile } from 'fs/promises';


export const load = (({ url }) => {
    //se modifico il piatto ho il param piattoId
    let piattoIdS = url.searchParams.get('piattoId');

    let categorie: Categoria[] = getCategorie();
    let allergeni = getAllergeni();

    let piatto = null;
    let allergeniPiatto = null;
    if (piattoIdS) { //se esiste il parametro ricavo tutti i suoi dati dal db
        let piattoId = parseInt(piattoIdS);
        piatto = getPiatto(piattoId);
        allergeniPiatto = getAllergeniPiatto(piattoId);
    }

    return { piatto, categorie, allergeni, allergeniPiatto };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        let piattoIdS = data.get('piattoId')?.toString();
        let nome = data.get('nome')?.toString();
        let descr = data.get('descr')?.toString();
        let prezzoS = data.get('prezzo')?.toString();
        let categoriaS = data.get('categoria')?.toString();
        let disponibileS = data.get('disponibile')?.toString();
        let file = data.get('fileToUpload') as File;

        let allergeni = getAllergeni();
        let allergeneS: string | undefined;
        let selectedAllergeni: number[] = [];
        for (let allergeneindex of allergeni) {
            allergeneS = data.get('allergene ' +
                allergeneindex.id)?.toString();
            console.log(allergeneS);
            if (allergeneS) {
                let allergene = parseInt(allergeneS);
                selectedAllergeni.push(allergene);
            }
        }

        //server-side validation
        if (!piattoIdS) {
            //se non è inserito deve essere auto-incrementale
            piattoIdS = '0';
        }
        if (!nome) {
            return fail(400, { missingName: true });
        }
        if (!descr) {
            descr = ' ';
        }
        if (!prezzoS) {
            return fail(400, { missingPrezzo: true });
        }
        if (!categoriaS) {
            return fail(400, { missingCategoria: true });
        }
        if (!disponibileS) {
            return fail(400, { missingIDisponibile: true });
        }

        //converto da string al tipo corrispondente
        let piattoId = parseInt(piattoIdS);
        if (isNaN(piattoId)) {
            return fail(400, { piattoIdS, incorrectId: true });
        }

        let prezzo = parseFloat(prezzoS);
        if (isNaN(prezzo) || prezzo <= 0) {
            return fail(400, { prezzoS, incorrectPrezzo: true });
        }

        let categoria = parseInt(categoriaS);
        if (isNaN(categoria)) {
            return fail(400, { categoriaS, incorrectCategoria: true });
        }

        let disponibile = parseInt(disponibileS);
        if (isNaN(disponibile)) {
            return fail(400, { disponibileS, incorrectDisponibile: true });
        }

        let imgName;
        if (
            !file.name ||
            file.name === 'undefined'
        ) {
            imgName = null;
        }
        imgName = file.name;


        let piatto = getPiatto(piattoId);
        //se esiste modifico, senno' lo creo
        if (piatto) {

            let existingAllergeni = getAllergeniPiatto(piattoId);
            let existingAllergeniId = existingAllergeni.map(a => a.id);
            let allergeniToRemove =
                existingAllergeniId.filter(a => !selectedAllergeni.includes(a));
            let allergeniToAdd =
                selectedAllergeni.filter(b => !existingAllergeniId.includes(b));

            //immagine invariata
            if (!imgName) {
                if (updatePiatto(piattoId, nome, descr,
                    prezzo, categoria, disponibile)) {

                    for (let allergene of allergeniToAdd) {
                        if (!createAllergenePiatto(piattoId, allergene)) {
                            return {
                                success: false, id: 3, piattoId: piattoId
                            };
                        }
                    }
                    for (let allergene of allergeniToRemove) {
                        if (!deleteAllergenePiatto(piattoId, allergene)) {
                            return {
                                success: false, id: 3, piattoId: piattoId
                            };
                        }
                    }

                    redirect(301, "/privato/gestioneMenu/");
                }
                else {
                    return { success: false, id: 1 };
                }
            }
            else {
                //immagine cambiata
                if (updatePiattoConImg(piattoId, nome, descr,
                    prezzo, categoria, disponibile, imgName)) {

                    await writeFile(`static/menuimg/${file.name}`,
                        Buffer.from(await file.arrayBuffer()));

                    for (let allergene of allergeniToAdd) {
                        if (!createAllergenePiatto(piattoId, allergene)) {
                            return {
                                success: false, id: 3, piattoId: piattoId
                            };
                        }
                    }
                    for (let allergene of allergeniToRemove) {
                        if (!deleteAllergenePiatto(piattoId, allergene)) {
                            return {
                                success: false, id: 3, piattoId: piattoId
                            };
                        }
                    }

                    redirect(301, "/privato/gestioneMenu/");
                }
                else {
                    return { success: false, id: 1 };
                }
            }
        }
        else {
            if (createPiatto(nome, descr, prezzo,
                categoria, disponibile, imgName)) {

                if (imgName) {
                    await writeFile(`static/menuimg/${file.name}`,
                        Buffer.from(await file.arrayBuffer()));
                }

                let lastPiattoId = getLastPiattoId().max; //id del piatto appena inserito (in quanto auto-incrementale)
                for (let allergene of selectedAllergeni) {
                    if (!createAllergenePiatto(lastPiattoId, allergene)) {
                        return {
                            success: false, id: 2, piattoId: lastPiattoId
                        };
                    }
                }

                redirect(301, "/privato/gestioneMenu/");
            }
            else {
                return { success: false, id: 0 };
            }
        }
    }
};
