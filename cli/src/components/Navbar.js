import React, {useContext,useEffect} from "react";
import {NavLink,useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  useEffect(() => {
    let sidenav = document.querySelector('#slide-out');
    window.M.Sidenav.init(sidenav,{});
  },[]);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <header>
      <nav className="nav-extended">
        <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
          <span className="brand-logo">Сокращение ссылок</span>
          <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul  className="right hide-on-med-and-down">
            <li><NavLink to="/create">Создать</NavLink></li>
            <li><NavLink to="/links">Ссылки</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
          </ul>
        </div>
      </nav>
      <ul id="slide-out" className="sidenav" >
        <li><NavLink className="sidenav-close" to="/create">Создать</NavLink></li>
        <li><NavLink className="sidenav-close" to="/links">Ссылки</NavLink></li>
        <li><a  className="sidenav-close" href="/" onClick={logoutHandler}>Выйти</a></li>
      </ul>
    </header>
  )
}
