/** Préfixe un fichier de /public avec le basePath (utile sur GitHub Pages). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
