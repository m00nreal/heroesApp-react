import {heroes} from "../data/heroes";

export const getHeroeById = ( id ) => {

    return heroes.find(h => h.id === id);
}