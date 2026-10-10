export const SITE_URL = "https://www.calculasalario.es";
export const SITE_NAME = "CalculaSalario";

/** Buzón para publicidad y colaboraciones. */
export const CONTACT_EMAIL = "davidcass97@hotmail.com";

/** Identificador de editor de AdSense (ca-pub-…). Vacío hasta tener la cuenta. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

/**
 * Datos del titular para el aviso legal (art. 10 LSSI). Los campos vacíos no se muestran.
 * Rellénalos antes de activar la publicidad.
 */
export const LEGAL = {
  ownerName: "",
  nif: "",
  address: "",
  lastUpdated: "10 de octubre de 2026",
};
