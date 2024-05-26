import { create } from "twrnc";

// creem la configuració personalitzada de TailwindCSS...
const tw = create(require(`./tailwind.config.js`)); // <- llegim l'arxiu

// ... exportem la funció per que la resta de l'aplicació pugui fer servir la nostra configuració
export default tw;
