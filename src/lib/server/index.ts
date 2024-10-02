import type { Allergene, Categoria, MaxId, Piatto, PiattoAllergeneRow, Utente } from "$lib/types";
import  Database from "better-sqlite3";

const db = new Database('./data/chinook.db' , { verbose: console.log});



export function getAllergeni(): Allergene[]{
    const sql = ' select * from allergene';
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    return rows as Allergene[];
}
export function getAllergene(allergeneId: number): Allergene {
    const sql='SELECT * FROM allergene WHERE id = $allergeneId';  //prepared statement
    const stmnt = db.prepare(sql);
    const rows = stmnt.get({allergeneId});
    return rows as Allergene;
}

export function updateAllergene(allergeneId : number, allergeneNome: string): boolean {
    const sql= 'UPDATE allergene SET nome = $allergeneNome WHERE id = $allergeneId ';
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ allergeneId, allergeneNome});
    }
    catch(err){
        return false;
    }
    return true;
}

export function createAllergene(allergeneId : number, allergeneNome: string): boolean {
    const sql= "INSERT INTO allergene (  id,  nome ) VALUES (  $allergeneId,  $allergeneNome );";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ allergeneId, allergeneNome});
    }
    catch(err){
        return false;
    }
    return true;
}

export function deleteAllergene(allergeneId : number):boolean {
    const sql= "DELETE FROM allergene WHERE id = $allergeneId ;";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ allergeneId});
    }
    catch(err){
        return false;
    } 
    return  true;
}

export function getPiatti(): Piatto[]{
    const sql = ' select * from piatto';
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    return rows as Piatto[];
}

export function getPiatto(piattoId: number): Piatto {
    const sql='SELECT * FROM piatto WHERE id = $piattoId';  //prepared statement
    const stmnt = db.prepare(sql);
    const rows = stmnt.get({piattoId});
    return rows as Piatto;
}

export function createPiatto( nome: string, descr: string | null, prezzo : number, categoria: number, disponibile: number, img : string | null): boolean {
    //id auto-incrementale
    const sql= "INSERT INTO piatto ( nome, descrizione, prezzo, categoria, disponibile, img ) VALUES ( $nome, $descr, $prezzo, $categoria , $disponibile, $img );";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ nome, descr, prezzo, categoria, disponibile, img});
    }
    catch(err){
        return false;
    }
    return true;
}

export function updatePiatto( id: number, nome: string, descr: string | null, prezzo : number, categoria: number, disponibile: number): boolean {
    const sql= "UPDATE piatto SET nome = $nome , descrizione = $descr , prezzo = $prezzo, categoria = $categoria, disponibile = $disponibile WHERE id = $id ";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({id, nome, descr, prezzo, categoria, disponibile});
    }
    catch(err){
        return false;
    }
    return true;
}

export function updatePiattoConImg( id: number, nome: string, descr: string | null, prezzo : number, categoria: number, disponibile: number, img : string): boolean {
    const sql= "UPDATE piatto SET nome = $nome , descrizione = $descr , prezzo = $prezzo, categoria = $categoria, disponibile = $disponibile , img = $img WHERE id = $id ";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({id, nome, descr, prezzo, categoria, disponibile, img});
    }
    catch(err){
        return false;
    }
    return true;
}

export function getLastPiattoId() : MaxId{
    const sql='SELECT MAX(id) AS max FROM piatto;'; 
    const stmnt = db.prepare(sql);
    const rows = stmnt.get();
    return rows as MaxId;
}

export function setPiattoDisponibile(id: number): boolean {
    const sql= "UPDATE piatto SET disponibile = '1' WHERE id = $id;"
    try{
        const stmnt = db.prepare(sql);
        stmnt.run({id});
        }
        catch(err){
            return false;
        }
        return true;
}

export function setPiattoNonDisponibile(id: number): boolean {
    const sql= "UPDATE piatto SET disponibile = '0' WHERE id = $id;"
    try{
        const stmnt = db.prepare(sql);
        stmnt.run({id});
        }
        catch(err){
            return false;
        }
        return true;
}


export function createAllergenePiatto( piatto: number , allergene: number): boolean {
    //id auto-incrementale
    const sql= "INSERT OR IGNORE INTO contiene ( piatto, allergene ) VALUES ( $piatto, $allergene );";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ piatto, allergene});
    }
    catch(err){
        return false;
    }
    return true;
}

export function getAllergeniPiatto(piattoId: number): Allergene[]{
    const sql = ' select a.* from contiene c join allergene a on c.allergene = a.id where piatto = $piattoId ;';
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({piattoId});
    return rows as Allergene[];
}

export function getPiattiEAllergeni(): PiattoAllergeneRow[]{
    const sql = 'SELECT  p.id AS piatto_id, p.nome AS piatto_nome, p.descrizione AS piatto_descr, p.prezzo AS piatto_prezzo, p.categoria AS piatto_categoria, p.disponibile AS piatto_disponibile, p.img AS piatto_img, a.id AS allergene_id, a.nome AS allergene_nome FROM piatto p LEFT JOIN contiene c ON p.id = c.piatto LEFT JOIN allergene a ON c.allergene = a.id ORDER BY p.id;';
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    return rows as PiattoAllergeneRow[];
}

export function deleteAllergenePiatto( piatto: number , allergene: number): boolean {
    const sql= "DELETE FROM contiene WHERE piatto = $piatto AND allergene = $allergene ;";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({ piatto, allergene});
    }
    catch(err){
        return false;
    }
    return true;
}

export function getCategorie(): Categoria[]{
    const sql = ' select * from categoria';
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    return rows as Categoria[];
}

export function getUtente(email : string): Utente{
    const sql='SELECT * FROM utente WHERE email = $email';  //prepared statement
    const stmnt = db.prepare(sql);
    const rows = stmnt.get({email});
    return rows as Utente;
}

export function getUtenteByToken(token: string): Utente{
    const sql='SELECT * FROM utente WHERE token = $token'; 
    const stmnt = db.prepare(sql);
    const rows = stmnt.get({token});
    return rows as Utente;
}

export function updateAuthToken(email : string, token: string): boolean {
    const sql= "UPDATE utente SET token = $token WHERE email = $email ";
    try{
    const stmnt = db.prepare(sql);
    stmnt.run({email, token});
    }
    catch(err){
        return false;
    }
    return true;
}