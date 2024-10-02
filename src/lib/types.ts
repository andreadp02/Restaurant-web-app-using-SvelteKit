export interface Allergene {
    id: number;
    nome: string
  }

export interface Piatto {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  categoria: number;
  disponibile: number;
  img: string;
}

export interface Categoria {
  id: number;
  nome: string
}

export interface PiattoAllergeneRow {
  piatto_id: number;
  piatto_nome: string;
  piatto_descr: string ;
  piatto_prezzo: number;
  piatto_categoria: number;
  piatto_disponibile: number;
  piatto_img : string | null ;
  allergene_id: number | null; // L'allergene può essere `null` se non c'è un allergene associato
  allergene_nome: string | null;
}

export interface MaxId {
  max: number;
};

export interface Utente {
  id : number;
  email : string;
  password : string;
  token : string;
}
