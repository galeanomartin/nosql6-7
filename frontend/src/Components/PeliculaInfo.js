import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Navbar";

//import { Player, BigPlayButton } from "video-react";
import { getAPItrailer, obtenerHeroe } from "../Funciones/Funciones";
//import { Redirect, Link } from "react-router-dom";
import "../../node_modules/video-react/dist/video-react.css";

import CardCasting from "./CardCasting";
import YouTube from "react-youtube";

function PeliculaInfo({ idpeli }) {
  const [listado, setListado] = useState([]);

  const [cast, setCast] = useState([]);
  const [idd, setId] = useState("");
  const [overview, setOverview] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [title, setTitle] = useState("");
  const [urlVideo, setUrlVideo] = useState("");

  const [verHeroe, estado] = useState("false");
  const [idCharacter, setIdCharacter] = useState("");

  const [arrayHeroes, setArrayHeroes] = useState([]);
  const [encontrado, setEncontrado] = useState(false);

  //Peticion para traer el listado actualizado
  const traerPeliculas = () => {
    axios
      .get("http://localhost:5000/peliculas")
      .then((res) => {
        if (res !== null) {
          console.log(res.data);
          // let aux = res.data.filter(peli => peli.id == idpeli)
          // console.log(aux)
          let peliculaBuscada = res.data.filter((peli) => peli.id == idpeli);
          console.log(peliculaBuscada);
          setTitle(peliculaBuscada[0].title);
          setId(peliculaBuscada[0].id);
          setOverview(peliculaBuscada[0].overview);
          setPosterPath(peliculaBuscada[0].poster_path);
          setReleaseDate(peliculaBuscada[0].release_date);
          setIdCharacter(peliculaBuscada[0].cast[0].id_hero);

          const aux = peliculaBuscada[0].cast.filter((cosa) => cosa.id_hero);
          setArrayHeroes(aux);

          //    console.log(peliculaBuscada[0].cast)

          getAPItrailer(idpeli).then((res) => {
            if (res.results[0].key) {
              setEncontrado(true);
              setUrlVideo(res.results[0].key);
              console.log(res.results[0].key);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);

      });
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

  const styleImage = {
    maxWidth: "19rem",
    maxWidht: "19rem",
    maxHeight: "18rem",
    minHeight: "18rem",
    marginTop: "0px",
  };

  useEffect(() => {
    traerPeliculas();
  }, []);

  return (
    <div style={body}>
      < Nav />

      <div className="jumbotron">
        <div class="container">
          <div>
            <h3 className="mb-3  mt-4 text-dark" align="center">TÍTULO:  {title}      </h3>
            {/*<figcaption className="text-justify text-xs-left text-dark ">
              {overview}
        </figcaption>*/}
            <h4 class="text-dark">Resumen: </h4>
            <textarea disabled className="mb-3  mt-4 text-dark" style={{ border: 'none' }} rows="3" value={overview} >
            </textarea>

          </div>

          <div class="col-md-4">
            <h4 class="my-3 text-dark">Detalles:</h4>
            <ul>
              <li class="text-dark">Película: {title} </li>
              <li class="text-dark">Fecha Lanzamiento: {releaseDate} </li>
            </ul>
          </div>
        </div>


        <h3 className="text-dark" align="center">TRAILER de: {title} </h3>

        {!encontrado ? (
          <p class="text-dark" align="center">
            No se encontró el Trailer de la película {title}
          </p>
        ) : null}


        <div align="center">
          <YouTube widht={500} height={500} videoId={urlVideo}></YouTube>
        </div>

        <h3 className="text-dark" align="center">POSTER</h3>
        <div align="center">
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            class="img-fluid"
            style={styleImage}
          />
        </div>


        <div>
          <h3 className="text-dark" align="center">
            Actores / Superheroes que interpretan:{" "}
          </h3>
          <div className="row row-cols-1 row-cols-md-3" align="center">
            {arrayHeroes.map((thing) => (
              <CardCasting id="card" thing={thing} key={thing._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeliculaInfo;

