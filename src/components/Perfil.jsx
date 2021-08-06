import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../Redux/usuarioDucks'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)    
    const loading = useSelector(store => store.usuario.loading)    

    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [activarCambioFoto, setActivarCambioFoto] = useState (false)
    const dispatch = useDispatch()

    const actualizarUsuario = () =>{
        if(!nombreUsuario.trim()){
            window.alert("Ingrese un nuevo nombre de usuario")
            return
        }

        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }

    const [error, setError] = useState(false)

    const seleccionarArchivo = imagen =>{
        const imagenCliente = imagen.target.files[0]
        console.log(imagenCliente.type)

        if(imagenCliente === undefined){
            window.alert("Selecciona una iamgen")
            return
        }
        if(imagenCliente.type === "image/png" || imagenCliente.type === "image/jpeg" || imagenCliente.type === "image/jpg"){
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        }else{
            setError(true)
        }
    }

    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="" className="img-fluid" width="100px"/>
                    <h5 className="card-title">
                        Nombre: {usuario.displayName}
                    </h5>
                    <p className="card-text">
                        Email: {usuario.email}
                    </p>

                    <button className="btn btn-dark mr-2" onClick={()=>{setActivarFormulario(!activarFormulario)}}>
                        Editar Nombre
                    </button>
                        <button className="btn btn-dark" onClick={()=>{setActivarCambioFoto(!activarCambioFoto)}}>
                            Cambiar foto
                        </button>
                </div>
                {
                    error && (<div className="alert alert-warning"> solo archivos .png, .jpeg o .jpg </div>)
                }
                    {
                        activarCambioFoto &&  
                        <div className="card-body">
                            
                            <div className="custom-file mb-5">
                                <input disabled={loading} type="file" className="custom-file-input" id="inputGroupFile02" style={ {display: "none"}} onChange={e=> seleccionarArchivo(e)} />
                                <label className={loading ? 'btn btn-dark  disable mt-2' : 'btn btn-dark mt-2' } htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Actualizar Imagen</label>
                            </div>
                        </div>
                    }
                
                   
                

                {
                    loading && 
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border">
                                <span className="sr-only"> Cargando...</span>
                            </div>
                        </div>
                    </div>
                }

                {
                    activarFormulario && 
                    
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-md-5"> 
                                <div className="input-group mb-3">
                                    <input type="text"
                                    className="form-control"
                                    placeholder="Ingrese nuevo nombre"
                                    onChange={(e)=>{setNombreUsuario(e.target.value)}}
                                    >
                                    </input>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={()=>{actualizarUsuario()}}> Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                }
                
            </div>
            
        </div>
    )
}

export default Perfil
