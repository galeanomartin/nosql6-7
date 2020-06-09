import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import MARVEL from "../Images/marvel.png";
import DC from "../Images/dc.png";
import Header from "./Header";
import Nav from "./Navbar";


function VerHeroe({ id }) {
  const [biografia, setBiografia] = useState("");
  const [imagenes, setCantidad] = useState("");
  const [character, setCharacter] = useState("");
  const [house, setHouse] = useState("");
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [iden, setIden] = useState("");

  const [arrayPeliculas, setArrayPeliculas] = useState([]);

  const [encontrado, setEncontrado] = useState(false);
  const [tieneEquipo, setTieneEquipo] = useState(false);

  //Peticion para traer el listado actualizado
  const encontrarHeroe = () => {
    axios
      .get("http://localhost:5000/listarTodos")
      .then((res) => {
        console.log(res.data);

        let heroeBuscado = res.data.filter((hero) => hero._id === id);

        setBiografia(heroeBuscado[0].biography);
        setCharacter(heroeBuscado[0].character);
        setHouse(heroeBuscado[0].house);
        setImages(heroeBuscado[0].images);
        setCantidad(heroeBuscado[0].images.length);
        console.log(imagenes);
        setBiografia(heroeBuscado[0].biography);
        setName(heroeBuscado[0].name);
        setYear(heroeBuscado[0].year);

        if (heroeBuscado[0].equipamento) {
          setEquipamento(heroeBuscado[0].equipamento);
          setTieneEquipo(true);
        }

        setIden(heroeBuscado[0]._id);
        const aux = heroeBuscado[0].movies.filter((pelis) => pelis.id);
        setArrayPeliculas(aux);
        setEncontrado(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };






  /*
    const eliminarHeroe = ({ iden }) => {
      return axios
        .post("http://localhost:5000/eliminar", {
          id: id,
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            title: "Superheroe eliminado!",
            /*text: "Se elimino correctamente",
            imageUrl:
              "https://i0.pngocean.com/files/158/205/64/5bbc3d0762e88-thumb.jpg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
          }).then((result) => {
            if (result.value) {
              let link = "/";
              window.location.href = link;
            }
          });
        })
        .catch((err) => {
          throw err.response.data;
        });
    };
  */

  const body = {

    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "absolute",
    minHeight: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
  };


  const editorial = () => {
    if (house === "MARVEL") {
      return MARVEL;
    } else {
      return DC;
    }
  };


  useEffect(() => {
    encontrarHeroe();
  }, []);

  const styleImage = {
    maxWidth: "27rem",
    maxHeight: "18rem",
  };

  const image = {
    width: null,
    resizeMode: 'contain',
    height: 25
  };

  return (
    <div style={body}>

      <Nav />

      <div className="jumbotron">
        {/*<h1 className="display-3" align="center"> {name}</h1>*/}



        <div align="center">
          {/*<h1 className="text-dark" float="left">{name}</h1>
          <div>
  <Header logo={editorial(house)} style="float: left;" /> {name}</div>*/}

          <table >

            <tr>
              <td><b><h1 className="text-dark" float="left">{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1></b></td>
              <td><Header logo={editorial(house)} style="float: left;" /> </td>

              {/*<td> <h1 className="text-dark" float="left">{name}</h1>Celda 2</td>*/}
            </tr>
          </table>




        </div>


        {/*<h3 className="text-dark" align="center">{house}</h3>*/}

        <div align="center" className="mt-4">
          <Carousel
            width={450}
            showArrows={true}
            dynamicHeight={true}
            align="center"
          >
            {images.map((img) => {
              return (
                <div>
                  <img alt="" style={styleImage} src={img} />
                </div>
              );
            })}
          </Carousel>
        </div>



        <p className="lead"> <textarea disabled name="textarea" style={{ border: 'none' }} rows="5" cols="50" placeholder={biografia}></textarea></p>
        {/*<hr className="my-4" />*/}

     

        <div class="col-md-4">
          <h4 class="my-3 text-dark">Otros datos:</h4>
          <ul>
            <li class="text-dark">Personaje : {character} </li>
            <li class="text-dark">Editorial : {house} </li>
            <li class="text-dark">Año de aparición: {year}</li>
            {/*<li class="text-dark">Equipamiento: {equipamiento} </li>*/}
            <li class="text-dark">Cantidad de imágenes : {imagenes} </li>
            <li class="text-dark">
              Equipamiento :{" "}
              {!tieneEquipo ? (
                <p class="text-dark">No tiene.</p>
              ) : null}{" "}
              {equipamento}{" "}
            </li>
          </ul>
        </div>

        {/*}
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
              </p>*/}

        <p className="lead">
          <Link to={`/modificar/${id}`}>
            <a class="btn btn-primary btn-lg" href="#" role="button">Modificar a {name} </a>
          </Link>
        </p>
        {/*} <Link onClick={() => eliminarHeroe(iden)}>
          <a class="btn btn-danger btn-lg" href="#" role="button">Eliminar a {name} </a>
            </Link>*/}

        <div class="container">
          

          <div align="right">
            <h3 className="text-dark">Películas donde aparece:</h3>
            {!encontrado ? (
              <p class="text-dark">Todavia no hay resultados!</p>
            ) : null}
            <ul className="list-group col-sm-4">
              {arrayPeliculas.map((thing) => (
                <Link to={`/peliculainfo/${thing.id}`}>

                  <li class="list-group-item text-center">{thing.title}</li>
                </Link>
              ))}
            </ul>
          </div>



        </div>
        
      </div>


    </div>
  );
}
export default VerHeroe;

