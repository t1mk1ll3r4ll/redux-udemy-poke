import React, { useState } from "react";
import Pokemones from "./components/Pokemones";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { auth } from "./firebase";
import Perfil from "./components/Perfil";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)
  useEffect(()=>{
    const fecthUser = ()=>{
      auth.onAuthStateChanged(user => {
        if(user){
          setFirebaseUser(user)
        }
        else{
          setFirebaseUser(null)
        }
      })
    }

    fecthUser()
  },[])

  const RutaPrivada = ({component, path, ...rest}) =>{
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest}/>
      }else{
        return <Redirect to="/login" {...rest}/>
      }
    }
    else{
      return <Redirect to="/login" {...rest}/>
    }
  }


  return firebaseUser !== false ? (

    <Router>
      <div className="container mt-3">
      <Navbar/>
        <Switch>
            <RutaPrivada component={Pokemones} path="/" exact/>
            <RutaPrivada component={Perfil} path="/Perfil" exact/>
            <Route component={Login} path="/login" />

        </Switch>
      </div>
      </Router>
  ) : (<div>Cargando</div>)
}

export default App;
