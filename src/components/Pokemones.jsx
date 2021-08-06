import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {obtenerPokemonesAccion , siguientePokemonAction, anteriorPokemonAction, pokeDetalleAccion} from "../Redux/pokeDucks.js"
import Detalle from './Detalle.jsx'

const Pokemones = () => {

    const dispatch = useDispatch()
    const {results} = useSelector(store => store.pokemones)
    const {next} = useSelector(store => store.pokemones)
    const {previous} = useSelector(store => store.pokemones )

    
    return (
        <div className= "row mt-5">

            <div className= "col-md-6">
            <h3> Lista de pokemones</h3>
                <div className="d-flex justify-content-between">
                   
                    {
                        results.length === 0   && <button className= "btn btn-dark" onClick={()=>dispatch(obtenerPokemonesAccion())}>get pokemon!</button> 
                    }

                </div>
                <ul className="list-group mt-3">
                    {results.map(item =>(
                        <li className="list-group-item text-uppercase"key={item.name}>{item.name}
                        <button onClick={()=> dispatch(pokeDetalleAccion(item.url))} className="btn btn-dark btn-sm float-right" >Info</button>
                        </li>
                    ))}
                </ul> 
                <div className="d-flex justify-content-between mt-4">
                    {
                        previous &&
                        <button  className= "btn btn-dark" onClick={()=> dispatch(anteriorPokemonAction())}>Anterior</button>
                    }

                    {
                        next && 
                        <button  className= "btn btn-dark" onClick={()=> dispatch(siguientePokemonAction())}>siguiente</button>
                    } 
                </div>
            </div>
            <div className= "col-md-6">
                <h3>Detalle del pokemon</h3>
                <Detalle/>            
            </div>
        </div>
    )
}

export default Pokemones
