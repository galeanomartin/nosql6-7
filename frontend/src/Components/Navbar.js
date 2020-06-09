import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import logo from "../Images/marvel-dc-logo.png";


class Navbar extends React.Component {

  getNavLinkClass = (path) => {


    return this.props.location.pathname === path ? 'active' : '';
  }


  render() {
    const image = {
      width: null,
      resizeMode: 'contain',
      height: 25
    };

    
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary navbar-fixed-top">
        {/*<a className="navbar-brand" href="/">Super Heroes</a>*/}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <a className="navbar-brand" href="/">
          <img src={logo} alt="Marvel-DC" style={image} />
        </a>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/marvel">Marvel</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dc">DC</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/agregar">Agregar SuperHeroe</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/verpeliculas">Películas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/peliculas">Buscador de Películas</a>
            </li>
          </ul>
          {/*
          <form className="form-inline my-2 my-lg-0">
            {/*<input className="form-control mr-sm-2" type="text" placeholder="Buscar Superheroe" />
            <input
              className="form-control mr-sm-2"
              id="buscadorSSJ"
              type="text"
              /*onChange={(e) => buscador(e)}
              placeholder="Buscar "
              autoComplete="off"
            ></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form>*/}
        </div>
      </nav>


    )
  }
};

Navbar = withRouter(Navbar);
export default Navbar