import {auth, firebase, db, storage } from '../firebase'

//data incial
const dataInicial = {
    loading:false,
    activo: false
}
//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR '
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function usuarioReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return{...state, loading:true}
        case USUARIO_ERROR:
            return {...dataInicial}
        case USUARIO_EXITO:
            return{...state, loading:false, activo: true, user: action.payload}
        case CERRAR_SESION:
            return{...dataInicial}

        default:
            return{...state}
    }
}
//acciones

export const ingresoUsuarioAccion = () => async (dispatch, getState)=>{
    dispatch({
        type: LOADING
    })
    try {
        const provider = new firebase.auth.GoogleAuthProvider()

        const res = await auth.signInWithPopup(provider)

        const usuario = {
            displayName : res.user.displayName,
            photoURL : res.user.photoURL,
            email: res.user.email,
            uid: res.user.uid

        }
        const usuarioDB = await db.collection('Usuarios').doc(usuario.email).get()

        if(usuarioDB.exists){
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))            
        }else{

            await db.collection('Usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload:usuario
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }

        dispatch({
            type: USUARIO_ERROR
        })
        localStorage.setItem('usuario', JSON.stringify({ uid:res.user.uid , email: res.user.email, photoURL: res.user.photoURL, displayName:res.user.displayName}))

        
    } catch (error) {
        console.log(error)
        dispatch({
            type:USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivo = () => (dispatch) =>{
    if(localStorage.getItem('usuario')){
        dispatch({
            type:USUARIO_EXITO,
            payload : JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) =>{
    auth.signOut()

    localStorage.removeItem('usuario')

    dispatch({
        type: CERRAR_SESION
    })
}

export const actualizarUsuarioAccion = (nombreActualizado) => async(dispatch, getState) => {
    dispatch({
        type:LOADING
    })
    const {user} = getState().usuario
    console.log(user)
    try {
        await db.collection('Usuarios').doc(user.email).update({
            displayName:nombreActualizado
        })

        const usuario = {
            ...user, displayName:nombreActualizado
        }

        dispatch({
            type:USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}

export const editarFotoAccion = (imagenEditada) => async (dispatch, getState)=>{
    dispatch({
        type:LOADING
    })
    const {user} = getState().usuario
    try {
        const imageRef = await storage.ref().child(user.email).child('foto perfil')
        await imageRef.put(imagenEditada)
        const imagenURL = await imageRef.getDownloadURL()
        console.log(imagenURL)

        await db.collection('Usuarios').doc(user.email).update({
            photoURL:imagenURL
        })

        const usuario ={
            ...user, photoURL:imagenURL
        }

        dispatch({
            type:USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))

    } catch (error) {
        console.log(error)        

    }
}   