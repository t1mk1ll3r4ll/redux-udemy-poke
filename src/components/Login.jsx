import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ingresoUsuarioAccion } from '../Redux/usuarioDucks'
import { withRouter } from 'react-router'
import { useEffect } from 'react'


const Login = (props) => {
    const dispatch = useDispatch()
    const {loading} = useSelector(store =>store.usuario)
    const {activo} = useSelector(store =>store.usuario)

    useEffect(()=>{
        if(activo){
            props.history.push('/')
        }
    },[activo, props.history])

    return (
        <div className="mt-5 text-center">
            <h3>Ingreso con Google</h3>
            <hr/>
            <button className="btn btn-dark" onClick={()=>{dispatch(ingresoUsuarioAccion())}}
            disabled={loading}> Acceder </button>
        </div>
    )
}

export default withRouter (Login)
