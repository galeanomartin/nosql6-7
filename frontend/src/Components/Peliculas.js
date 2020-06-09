import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import CardMovie from "./CardMovie";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import logo from "../Images/marvel-dc-logo.png";

function Peliculas() {
  const [query, setQuery] = useState("");
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [encontrado, setEncontrado] = useState(false);

  const buscar = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3cee3748aaea0df0145414e5cb47570c&query=${query}`
      )
      .then((res) => {
        if (res.data.total_results == 0) {
          setEncontrado(false);
          setLoading(false);
          console.log(res.data);
        } else {
          setLoading(false);
          setEncontrado(true);
        }
        if (res.data.results.length > 10) {
          setListado(res.data.results.slice(0, 10));
        } else {
          setListado(res.data.results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const styleLoader = {
    position: "absolute",
    top: "70%",
    left: "60%",
    marginLeft: "-300px",
  };

  const image = {
    width: null,
    resizeMode: 'contain',
    height: 25
  };

  return (
    <Fragment>

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
            {/*
            <li className="nav-item">
              <a className="nav-link" href="/peliculas">Películas</a>
            </li>*/}
            <li className="nav-item">
              <a className="nav-link" href="/verpeliculas">Películas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/peliculas">Buscador de Películas</a>
            </li>
          </ul>



          <form className="form-inline my-2 my-lg-0" onSubmit={(e) => buscar(e)}>
            {/*<input className="form-control mr-sm-2" type="text" placeholder="Buscar Superheroe" />*/}
            <input
              className="form-control mr-sm-2"
              id="buscadorSSJ"
              type="text"
              onChange={(e) => buscar(e)}
              placeholder="Buscar Películas"
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              autoFocus
            ></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form>

        </div>
      </nav>


      <div className="jumbotron" align="center">
        <h3 className="text-dark" align="center">BUSCAR PELICULAS DE www.themoviedb.org</h3>
        <h4 className="text-dark" align="center">Ingrese en el buscador el nombre de la película</h4>

        {/*}
        <h1 className="display-3">Cargar una película</h1>
        <p className="lead">Ingrese un nombre de una película </p>
        <hr className="my-4" />
        <p class="text-info">Se muestran los primeros resultados.</p>

        <div align="center" className="col-sm-3">
          <form className="form " onSubmit={(e) => buscar(e)}>
            <input
              className="form-control"
              type="text"
              placeholder="Nombre"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary mt-3" type="submit">
              Buscar
            </button>
          </form>
        </div>/*/}

        {!encontrado ? (
          <p class="text-dark mt-3">Todavia no hay resultados!</p>
        ) : null}
        {/*}
        <Link to="/" type="button" className="btn btn-info mt-2">
          Home
        </Link>*/}

      </div>

      {loading ? (
        <div style={styleLoader}>
          {" "}
          <Loader
            type="TailSpin"
            color="#63696E"
            height={150}
            width={150}
          />
          {" "}

          <h3>Buscando Películas... </h3>
        </div>

      ) : (
          <div className="row row-cols-1 row-cols-md-3" align="center">
            {listado.map((thing) => (
              <CardMovie thing={thing} />
            ))}
          </div>

        )}


    </Fragment>
  );
}
export default Peliculas;

