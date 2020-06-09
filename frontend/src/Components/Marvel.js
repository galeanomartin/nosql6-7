import React, { Fragment, useState, useEffect } from "react";
import Card from "./Card";
import Loader from "react-loader-spinner";
import axios from "axios";
import marvel from "../Images/marvel.png";
import logo from "../Images/marvel-dc-logo.png";

/*
import $ from "jquery";
import Nav from "./Navbar";*/

import "./Buscador.css";

function Marvel() {
  const [listado, setListado] = useState([]);
  const [loading, setLoading] = useState(false);

  const [listAux, setListAux] = useState([]);

  const [mostrarOtro, setMostrarOtro] = useState("false");

  const obtenerPjs = () => {
    setLoading(true)
    axios
      .get("http://localhost:5000/marvel")
      .then((res) => {
        if (res !== null) {
          console.log(res.data);
          setListado(res.data);
          setListAux(res.data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscador = (e) => {
    let value = e.target.value;
    if (value === "") {
      setListAux(listado);
    } else {
      console.log("entro");
      setListAux(
        listado.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    obtenerPjs();
  }, []);

  const styleLoader = {
    position: "absolute",
    top: "50%",
    left: "60%",
    marginLeft: "-300px",
  };

  const image = {
    width: null,
    resizeMode: 'contain',
    height: 25
  };

  const logo_marvel = {
    width: null,
    resizeMode: 'contain',
    height: 100
  };

  const body = {
   
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "absolute",
    minHeight: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
  };

  return (
    <div style={body}>

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

          <form className="form-inline my-2 my-lg-0">
            {/*<input className="form-control mr-sm-2" type="text" placeholder="Buscar Superheroe" />*/}
            <input
              className="form-control mr-sm-2"
              id="buscadorSSJ"
              type="text"
              onChange={(e) => buscador(e)}
              placeholder="Buscar Superheroe"
              autoComplete="off"
            ></input>
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form>

        </div>
      </nav>


      <div className="jumbotron">
      {/*<h3 className="text-dark" align="center">SUPERHEROES</h3>*/}
      <center>
      <img src={marvel} alt="Marvel" style={logo_marvel} />
      </center>
      {/*<h4 className="text-dark" align="center">MARVEL</h4>*/}


        {loading ? (
          <div style={styleLoader}>
            {" "}
            <Loader type="Watch" color="#FDFEFF" height={150} width={150} />{" "}
            <h3 className="text-light">Cargando ... </h3>
          </div>
        ) : (
            <div className="row row-cols-1 row-cols-md-3" align="center">
              {listAux.map((thing) => (
                <Card id="card" thing={thing} key={thing._id} />
              ))}
            </div>
          )}
      </div>
      </div>
  );
}

export default Marvel;
