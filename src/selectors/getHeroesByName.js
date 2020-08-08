import {heroes} from "../data/heroes";


export const getHeroesByName = ( name ) => {
    if (name === '') return [];
    name = name.toLocaleLowerCase()
    return heroes.filter(h => h.superhero.toLocaleLowerCase().includes(name));
}