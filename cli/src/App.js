import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from './context/AuthContext'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import 'materialize-css';
import './App.css';
import {Footer} from "./components/Footer";

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (!ready) return <Loader/>;
  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuth}}>
        <BrowserRouter>
          {isAuth && <Navbar/>}
          <main className="container">
            {routes}
          </main>
          {isAuth && <Footer/>}
        </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
