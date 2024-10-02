import { getAllergeni, getCategorie, getPiattiEAllergeni } from "$lib/server";
import type { Allergene } from "$lib/types";

export const load = (() => {

    const allergeni: Allergene[] = getAllergeni();
    const categorie = getCategorie();

    let results = getPiattiEAllergeni();
    const piattiMap = new Map<number, {id: number; nome: string; descr: string; prezzo: number; categoria: number; disponibile: number; img: string | null; allergeni: { id: number; nome: string }[] }>();

    for (let row of results) {
        if (!piattiMap.has(row.piatto_id)) {
            piattiMap.set(row.piatto_id, {
                id: row.piatto_id,
                nome: row.piatto_nome,
                descr: row.piatto_descr,
                prezzo: row.piatto_prezzo,
                categoria: row.piatto_categoria,
                disponibile: row.piatto_disponibile,
                img: row.piatto_img,
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
    return {
        allergeni, piatti, categorie
    };
});