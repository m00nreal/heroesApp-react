import React, {useMemo} from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {useForm} from "../../hooks/useForm";
import HeroCard from "../heroes/HeroCard";
import {getHeroesByName} from "../../selectors/getHeroesByName";

const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = ''} = queryString.parse(location.search);


    const initialForm = { hero: q};

    const [ formValues, handleInputChange, reset ] = useForm(initialForm);

    const { hero } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = ( e ) => {
        e.preventDefault();
        history.push(`?q=${hero}`);
    };

    return (
        <div>
            <h1 className="text-center">Buscar un heroe</h1>
            <hr/>

            <div className="row flex-column align-content-center">
                <div className="col-3">
                    <h4>Nombre</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input
                            autoComplete="off"
                            type="text"
                            placeholder="Search a hero..."
                            name="hero"
                            className="form-control mb-2"
                            onChange={handleInputChange}
                            value={hero}
                        />

                        <button
                            className="btn btn-outline-primary btn-block"
                            type="submit"
                        >
                            Search
                        </button>

                    </form>
                </div>

                <div className="col-7">
                    <h4> Resultados </h4>
                    <hr/>

                    {
                        (q === '') &&
                        <div className="alert alert-info">
                            Busca un heroe
                        </div>

                    }

                    {
                        (q !== '' && heroesFiltered.length === 0 )&&
                        <div className="alert alert-danger">
                            No se encontraron heroes con '{q}'
                        </div>

                    }


                    {
                        (q !== '' && heroesFiltered.length > 0 ) &&
                        <div className="alert alert-success">
                            Se encontraron {heroesFiltered.length} resultados(s)
                        </div>
                    }

                    {
                        heroesFiltered.map(h => (
                            <HeroCard key={h.id} {...h}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchScreen;
