import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {pokeDetalleAccion} from '../Redux/pokeDucks'

const Detalle = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fecthData = ()=>{
            dispatch(pokeDetalleAccion())
        }
        fecthData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.detallePokemon)

    return  pokemon ?(
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.foto} className="img-fluid" alt=""></img>
                <div className="card-title text-uppercase "> {pokemon.nombre}</div>
                <p className="card-text"> Alto {pokemon.alto} | Ancho {pokemon.ancho}</p>
            </div>
        </div>
    ) : null
}

export default Detalle
